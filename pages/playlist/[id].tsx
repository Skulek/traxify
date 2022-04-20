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
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import formatDuration from "format-duration";
import { Song } from "@prisma/client";
import MainLayout from "../../components/mainLayout";
import prisma from "../../lib/prisma";
import { FormatDateToDayAgo } from "../../lib/formatters";
import { useStoreActions } from "../../lib/hooks";

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const playlist = await prisma.playlist.findUnique({
    where: { id: +params.id },
    include: {
      songs: {
        include: {
          artist: {},
          album: {},
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 240, // In seconds
  };
}

export async function getStaticPaths() {
  const playlists = await prisma.playlist.findMany();
  // Get the paths we want to pre-render based on posts
  const paths = playlists.map((playlist) => ({
    params: { id: playlist.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const Playlist = ({
  playlist,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
