import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { Song } from "@prisma/client";
import { formatTime } from "../lib/formatters";
import { useStoreActions, useStoreState } from "../lib/hooks";

interface PlayerProps {
  activeSong: Song | null;
  songs: Song[];
}

const Player = ({ activeSong, songs }: PlayerProps) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex((s) => {
      return s.id === activeSong?.id;
    })
  );
  const [seek, setSeek] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef<ReactHowler>(null);
  const repeatRef = useRef<boolean>(repeat);
  const shuffleRef = useRef<boolean>(repeat);

  const setActiveSong = useStoreActions((state) => state.changeActiveSong);
  const volume = useStoreState((store) => store.volume);
  const handleKeyUp = useCallback(
    (ev) => {
      if (ev.code === "Space") {
        setPlaying((prevState) => !prevState);
        ev.preventDefault();
      }
    },
    [setPlaying]
  );

  useEffect(() => {
    let timerId = 0;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current?.seek() ?? 0);
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    if (timerId) {
      cancelAnimationFrame(timerId);
    }
  }, [playing, isSeeking]);

  useEffect(() => {
    if (songs.length && index > -1) {
      setActiveSong(songs[index]);
    }
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffleRef) {
        let next = Math.floor(Math.random() * songs.length);
        while (next === state) {
          next = Math.floor(Math.random() * songs.length);
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef) {
      setSeek(0);
      soundRef.current?.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current?.duration() ?? 0;
    setDuration(songDuration);
  };

  const onSeek = ([time]: number[]) => {
    setSeek(parseFloat(time.toString()));
    soundRef.current?.seek(time);
  };

  return (
    <Box>
      {activeSong ? (
        <Box>
          <ReactHowler
            ref={soundRef}
            playing={playing}
            src={activeSong?.url}
            onLoad={onLoad}
            onEnd={onEnd}
            volume={volume}
          />
        </Box>
      ) : null}
      <Center>
        <ButtonGroup isDisabled={activeSong === null}>
          <IconButton
            outline="none"
            variant="link"
            color={shuffle ? "white" : "gray.600"}
            aria-label="shuffle"
            onClick={onShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            color="gray.600"
            aria-label="previous"
            onClick={prevSong}
            icon={<MdSkipPrevious />}
          />
          {!playing ? (
            <IconButton
              _focus={{
                boxShadow: "none",
              }}
              outline="none"
              variant="link"
              aria-label="play"
              color="white"
              fontSize="5xl"
              onClick={() => setPlayState(true)}
              icon={<MdOutlinePlayCircleFilled />}
            />
          ) : (
            <IconButton
              _focus={{
                boxShadow: "none",
              }}
              outline="none"
              variant="link"
              aria-label="pause"
              color="white"
              fontSize="5xl"
              onClick={() => setPlayState(false)}
              icon={<MdOutlinePauseCircleFilled />}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            color="gray.600"
            aria-label="next"
            onClick={nextSong}
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            variant="link"
            color={repeat ? "white" : "gray.600"}
            aria-label="repeat"
            onClick={onRepeat}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs" textAlign="center">
              {formatTime(seek)}
            </Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              isDisabled={activeSong === null}
              step={0.1}
              min={0}
              value={[seek]}
              onChange={onSeek}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              id="player-range"
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Text fontSize="xs" textAlign="center">
              {formatTime(duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
