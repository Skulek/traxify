import { Box, Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { Song } from "@prisma/client";
import { MdAlbum, MdMusicNote, MdPeople, MdPlayArrow } from "react-icons/md";
import { useStoreActions } from "../lib/hooks";
import { SearchResults } from "../lib/types";

const SearchResultsList = ({ albums, songs, artists }: SearchResults) => {
  const setActiveSongs = useStoreActions(
    (actions) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions((actions) => actions.changeActiveSong);

  const isAnyData =
    albums === undefined || songs === undefined || artists === undefined;

  const handleSongPlay = (song: Song) => {
    setActiveSong(song);
    setActiveSongs([song]);
  };

  if (isAnyData) return null;
  const allSearchData = {
    songs,
    albums,
    artists,
    total: [...songs, ...albums, ...artists],
  };
  return allSearchData.total.length ? (
    <Box paddingY="0.5rem" color="whiteAlpha.500">
      <Text size="h2" color="whiteAlpha.800" paddingBottom="20px">
        Search Results:
      </Text>
      {songs?.map((song) => (
        <Flex key={song.id} alignItems="center">
          <Text flex="2">{song.name}</Text>
          <MdMusicNote />
          <IconButton
            aria-label="play"
            variant="outline"
            border="none"
            color="green.500"
            icon={<MdPlayArrow />}
            onClick={() => handleSongPlay(song)}
          />
        </Flex>
      ))}
      {artists?.map((artist) => (
        <Flex key={artist.id} alignItems="center">
          <Text flex="2">{artist.name}</Text>
          <MdPeople />
        </Flex>
      ))}
      {albums?.map((album) => (
        <Flex key={album.id} alignItems="center">
          <Text flex="2">{album.name}</Text>
          <MdAlbum />
        </Flex>
      ))}
    </Box>
  ) : (
    <Text size="h2" color="whiteAlpha.800" paddingBottom="20px">
      No results :(
    </Text>
  );
};
export default SearchResultsList;
