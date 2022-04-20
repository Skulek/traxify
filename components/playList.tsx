import {
  Center,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Playlist } from "@prisma/client";
import Link from "next/link";
import { MdError } from "react-icons/md";
import { usePlaylist } from "../lib/hooks";

const PlayList = () => {
  const { playlists, isLoading, isError } = usePlaylist();
  if (isLoading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }
  if (isError) {
    return (
      <Center paddingX="10px" gap="5px">
        <MdError display="inline" size="5em" />
        <span>
          Upps - something went wrong - we are looking how to fix that
        </span>
      </Center>
    );
  }
  return playlists?.length > 0 ? (
    <List spacing={2}>
      {playlists.map((playlistItem: Playlist) => (
        <ListItem paddingX="20px" key={playlistItem.name}>
          <LinkBox>
            <Link href={`/playlist/${playlistItem.id}`} passHref>
              <LinkOverlay>{playlistItem.name}</LinkOverlay>
            </Link>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  ) : (
    <Center>
      <Text>No playlists - add new one !</Text>
    </Center>
  );
};

export default PlayList;
