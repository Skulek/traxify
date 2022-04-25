import { Box, Flex } from "@chakra-ui/layout";
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { MdOutlineRingVolume, MdOutlineVolumeUp } from "react-icons/md";
import { useStoreActions } from "../lib/hooks";

interface volumeProps {
  volume: number;
}

const VolumeControl = ({ volume }: volumeProps) => {
  const setVolume = useStoreActions((state) => state.changeVolume);

  const onVolume = ([volumeValue]: number[]) => {
    setVolume(volumeValue);
  };

  return (
    <Flex direction="row" width="20rem" gap="10px">
      <MdOutlineVolumeUp color="green" size="25px" />
      <RangeSlider
        step={0.1}
        min={0}
        value={[volume]}
        onChange={onVolume}
        max={1}
        id="volume-range"
      >
        <RangeSliderTrack bg="gray.800">
          <RangeSliderFilledTrack bg="gray.600" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
      </RangeSlider>
    </Flex>
  );
};
export default VolumeControl;
