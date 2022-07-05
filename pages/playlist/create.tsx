import { Box, Button, Center, Image, Input } from "@chakra-ui/react";
import { Playlist, Song } from "@prisma/client";
import InferNextPropsType from "infer-next-props-type";
import { ChangeEvent, useState } from "react";
import { useSWRConfig } from "swr";
import MainLayout from "../../components/mainLayout";
import SongsTable from "../../components/songsTable";
import fetcher from "../../lib/fetcher";
import { useStoreActions, useUser } from "../../lib/hooks";
import { prisma } from "../../lib/prisma";
import { SongId } from "../../lib/types";

export async function getServerSideProps() {
  const songs = await prisma.song.findMany({
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
  });
  return {
    props: {
      songs,
    }, // will be passed to the page component as props
  };
}

const CreatePlaylistPage = ({
  songs,
}: InferNextPropsType<typeof getServerSideProps>) => {
  const { user, isLoading } = useUser();
  const { mutate, cache } = useSWRConfig();
  const setActiveSongs = useStoreActions(
    (actions) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions((actions) => actions.changeActiveSong);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState<SongId[]>([]);

  const updateFn = () => {
    return fetcher<Playlist>("playlist", {
      playlistName,
      playlistSongs,
      userEmail: user?.email,
    });
  };
  const handlePlaylistCreate = async () => {
    const options = { optimisticData: user, rollbackOnError: true };

    mutate("/playlist", updateFn, options);
  };

  const handlePlay = (activeSong?: Song) => {
    if (activeSong) {
      setActiveSong(activeSong);
      setActiveSongs([activeSong]);
    }
  };

  const handleAddSongToPlaylist = (song: Song) => {
    setPlaylistSongs([...playlistSongs, { id: song.id }]);
  };

  const handleRemoveSongFromPlaylist = (song: Song) => {
    setPlaylistSongs(playlistSongs.filter((s) => s.id !== song.id));
  };

  const handlePlaylistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setPlaylistName(e.target.value);
  };

  return (
    <MainLayout
      type="CreatePlayList"
      image={
        <Image
          boxSize={150}
          boxShadow="2xl"
          alt="create-playlist"
          src="https://picsum.photos/200"
        />
      }
      description="Playlist with songs"
      header={
        <Input
          type="text"
          value={playlistName}
          onInput={handlePlaylistNameChange}
          placeholder="Playlist name"
          size="lg"
        />
      }
      gradient={{
        color: "red",
        direction: "to-b",
      }}
      userName={`${user?.firstName} ${user?.lastName}`}
      loading={!isLoading}
    >
      <SongsTable
        type="create-playlist"
        songs={songs}
        handlePlay={handlePlay}
        handleAddSongToPlaylist={handleAddSongToPlaylist}
        handleRemoveSongFromPlaylist={handleRemoveSongFromPlaylist}
        playlistSongs={playlistSongs}
      />
      <Center paddingTop="20px">
        <Button
          boxShadow="md"
          disabled={playlistName === "" || playlistSongs.length === 0}
          rounded="md"
          width={300}
          onClick={handlePlaylistCreate}
          _hover={{
            background: "green",
            color: "white",
          }}
        >
          Create playlist
        </Button>
      </Center>
    </MainLayout>
  );
};

export default CreatePlaylistPage;
