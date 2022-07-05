import { Box } from "@chakra-ui/layout";
import { IconButton, Image } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { GetServerSidePropsContext } from "next";
import InferNextPropsType from "infer-next-props-type";
import { Song } from "@prisma/client";
import MainLayout from "../../components/mainLayout";
import { prisma } from "../../lib/prisma";
import { useStoreActions } from "../../lib/hooks";
import { getUserIdFromJwt } from "../../lib/auth";
import SongsTable from "../../components/songsTable";

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
      user: {
        select: {
          firstName: true,
          lastName: true,
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
    setActiveSong(activeSong || playlist?.songs[0] || null);
    if (playlist?.songs.length) {
      setActiveSongs(playlist.songs);
    }
  };

  if (!playlist) return <Box>No playlist found</Box>;
  return (
    <MainLayout
      type="Playlist"
      image={
        <Image
          boxSize="150px"
          src="https://picsum.photos/200"
          alt={playlist.name}
          rounded="none"
          boxShadow="2xl"
        />
      }
      description={`Playlist with ${playlist.songs.length} songs`}
      header={playlist.name}
      gradient={{
        color: "red",
        direction: "to-b",
      }}
      userName={`${playlist.user?.firstName} ${playlist.user?.lastName}`}
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
        <SongsTable
          type="readonly"
          songs={playlist.songs}
          handlePlay={handlePlay}
        />
      </Box>
    </MainLayout>
  );
};
export default Playlist;
