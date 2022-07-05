import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import formatDuration from "format-duration";
import { Song } from "@prisma/client";
import { HiOutlineClock } from "react-icons/hi";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FormatDateToDayAgo } from "../lib/formatters";
import { SongId } from "../lib/types";

type SongsTableType = "readonly" | "create-playlist";

interface SongsTableProps {
  songs: (Song & {
    artist: {
      name: string;
    };
    album: {
      name: string;
    } | null;
  })[];
  type: SongsTableType;
  handlePlay: (activeSong: Song) => void;
  playlistSongs?: SongId[];
  handleAddSongToPlaylist?: (song: Song) => void;
  handleRemoveSongFromPlaylist?: (song: Song) => void;
}

const handleIconClick = (
  e: React.MouseEvent<SVGAElement, MouseEvent>,
  song: Song,
  func?: (s: Song) => void
) => {
  e.stopPropagation();
  if (func) func(song);
};

const SongsTable = ({
  type = "readonly",
  songs,
  playlistSongs,
  handlePlay,
  handleAddSongToPlaylist,
  handleRemoveSongFromPlaylist,
}: SongsTableProps) => {
  return (
    <TableContainer>
      <Table variant="unstyled">
        <Thead
          color="whiteAlpha.900"
          borderBottom="1px solid"
          borderColor="rgba(255, 255,255,0.2)"
          fontWeight="bold"
        >
          <Tr>
            <Th width={15}>#</Th>
            <Th>Name</Th>
            <Th>Album</Th>
            <Th>Date Added</Th>
            <Th isNumeric>
              <HiOutlineClock />
            </Th>
          </Tr>
        </Thead>
        <Tbody color="whiteAlpha.800">
          {songs.map((song, index) => (
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
              <Td verticalAlign="middle">{index + 1}</Td>
              <Td>
                <Flex align="center" justify="space-between">
                  <Flex gap="10px">
                    <Image
                      alignSelf="center"
                      boxSize="40px"
                      objectFit="cover"
                      src="https://picsum.photos/200"
                      alt="hello"
                    />
                    <Box>
                      <Text fontWeight="bold">{song.name}</Text>
                      <Text>{song.artist.name}</Text>
                    </Box>
                  </Flex>
                  {type === "create-playlist" ? (
                    <Box>
                      {playlistSongs?.some((s) => s.id === song.id) ? (
                        <DeleteIcon
                          cursor="pointer"
                          w={6}
                          h={6}
                          onClick={(
                            event: React.MouseEvent<SVGAElement, MouseEvent>
                          ) =>
                            handleIconClick(
                              event,
                              song,
                              handleRemoveSongFromPlaylist
                            )
                          }
                        />
                      ) : (
                        <AddIcon
                          cursor="pointer"
                          onClick={(
                            event: React.MouseEvent<SVGAElement, MouseEvent>
                          ) =>
                            handleIconClick(
                              event,
                              song,
                              handleAddSongToPlaylist
                            )
                          }
                          w={6}
                          h={6}
                        />
                      )}
                    </Box>
                  ) : null}
                </Flex>
              </Td>
              <Td verticalAlign="middle">{song.album?.name}</Td>
              <Td verticalAlign="middle">
                <Tooltip
                  label={song.updatedAt.toDateString()}
                  aria-label="A tooltip"
                >
                  {FormatDateToDayAgo(song.updatedAt)}
                </Tooltip>
              </Td>
              <Td isNumeric verticalAlign="middle">
                {formatDuration(song.duration * 1000)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

SongsTable.defaultProps = {
  handleAddSongToPlaylist: () => undefined,
  handleRemoveSongFromPlaylist: () => undefined,
  playlistSongs: [],
};

export default SongsTable;
