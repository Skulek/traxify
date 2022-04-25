import { Box, Center, Flex, Square, Text } from "@chakra-ui/layout";
import { useStoreState } from "../lib/hooks";
import Player from "./player";
import VolumeControl from "./volumeControl";

const PlayerBar = () => {
  const songs = useStoreState((state) => state.activeSongs);
  const activeSong = useStoreState((state) => state.activeSong);
  const volume = useStoreState((state) => state.volume);
  return (
    <Box height="100px" width="100%" bg="gray.900" padding="10px">
      <Flex height="100%" gap="xs" flexGrow={[1, 3, 1]}>
        <Flex justify="center" align="center" color="white" width="20%">
          {activeSong ? (
            <Box paddingX="20px">
              <Text fontSize="large">{activeSong?.name}</Text>
            </Box>
          ) : null}
        </Flex>
        <Box flexGrow={[1, 2]}>
          <Player songs={songs ?? []} activeSong={activeSong} />
        </Box>
        <Flex justify="center" align="center" width="20%">
          <VolumeControl volume={volume} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
