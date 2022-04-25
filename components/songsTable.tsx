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
import { FormatDateToDayAgo } from "../lib/formatters";

interface SongsTableProps {
  songs: (Song & {
    artist: {
      name: string;
    };
    album: {
      name: string;
    } | null;
  })[];
  handlePlay: (activeSong: Song) => void;
}

const SongsTable = ({ songs, handlePlay }: SongsTableProps) => {
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
                <Flex gap="5px" align="center">
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

export default SongsTable;
