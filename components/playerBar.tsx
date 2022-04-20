import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "../lib/hooks";
import Player from "./player";
import VolumeControl from "./volumeControl";

const PlayerBar = () => {
  const songs = useStoreState((state) => state.activeSongs);
  const activeSong = useStoreState((state) => state.activeSong);
  const volume = useStoreState((state) => state.volume);
  return (
    <Box height="100px" width="100%" bg="gray.900" padding="10px">
      <Flex align="center" height="100%">
        <Box bgColor="blue" color="white" width="30%">
          {activeSong ? (
            <>
              <Text fontSize="large">{activeSong?.name}</Text>
              <Text fontSize="sm">{activeSong?.id}</Text>
            </>
          ) : null}
        </Box>
        <Box bg="green" flexGrow={[1, 2]}>
          <Player songs={songs ?? []} activeSong={activeSong} />
        </Box>
        <Box bg="yellow" width="20%">
          <VolumeControl volume={volume} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
