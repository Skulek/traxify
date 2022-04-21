import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { HiOutlineClock } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import { GetServerSidePropsContext } from "next";
import InferNextPropsType from "infer-next-props-type";
import formatDuration from "format-duration";
import { Song } from "@prisma/client";
import MainLayout from "../../components/mainLayout";
import { prisma } from "../../lib/prisma";
import { FormatDateToDayAgo } from "../../lib/formatters";
import { useStoreActions } from "../../lib/hooks";
import { getUserIdFromJwt } from "../../lib/auth";

export async function getServerSideProps({
  params,
  req,
}: GetServerSidePropsContext<{ id: string }>) {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }
  const token = req.cookies[process.env.APP_SECRET];
  const userId = getUserIdFromJwt(token);
  const playlist = await prisma.playlist.findUnique({
    where: { id: +params.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
            },
          },
          album: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (playlist?.userId !== userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      playlist,
    },
  };
}

const Playlist = ({
  playlist,
}: InferNextPropsType<typeof getServerSideProps>) => {
  const setActiveSongs = useStoreActions(
    (actions) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions((actions) => actions.changeActiveSong);

  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong || playlist?.songs[0]!);
    if (playlist?.songs) {
      setActiveSongs(playlist.songs);
    }
  };

  if (!playlist) return <Box>No playlist found</Box>;
  return (
    <MainLayout
      type="Playlist"
      image={{ alt: playlist.name, src: "https://picsum.photos/200" }}
      description={`Playlist with ${playlist.songs.length} songs`}
      header={playlist.name}
      gradient={{
        color: "red",
        direction: "to-b",
      }}
      loading
    >
      <Box bg="transparent" width="100%">
        <Box padding="10px" marginBottom="20px">
          <IconButton
            rounded="full"
            aria-label="play"
            colorScheme="green"
            icon={<BsFillPlayFill fontSize="30px" />}
            onClick={() => handlePlay()}
          />
        </Box>
        <TableContainer>
          <Table variant="unstyled">
            <Thead
              color="whiteAlpha.900"
              borderBottom="1px solid"
              borderColor="rgba(255, 255,255,0.2)"
              fontWeight="bold"
            >
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Album</Th>
                <Th>Date Added</Th>
                <Th isNumeric>
                  <HiOutlineClock />
                </Th>
              </Tr>
            </Thead>
            <Tbody color="whiteAlpha.800">
              {playlist.songs.map((song, index) => (
                <Tr
                  sx={{
                    transition: "all .3s ",
                    "&:hover": {
                      bg: "rgba(255,255,255, 0.1)",
                    },
                  }}
                  key={song.id}
                  cursor="pointer"
                  onClick={() => handlePlay(song)}
                >
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex gap="5px">
                      <Image
                        alignSelf="center"
                        boxSize="30px"
                        objectFit="cover"
                        src="https://picsum.photos/200"
                        alt="hello"
                      />
                      <Box>
                        <Text fontWeight="bold">{song.name}</Text>
                        <Text>{song.artist.name}</Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>{song.album?.name}</Td>
                  <Td>
                    <Tooltip
                      label={song.updatedAt.toDateString()}
                      aria-label="A tooltip"
                    >
                      {FormatDateToDayAgo(song.updatedAt)}
                    </Tooltip>
                  </Td>
                  <Td isNumeric>{formatDuration(song.duration * 1000)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </MainLayout>
  );
};
export default Playlist;
