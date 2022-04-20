import { Playlist, User } from "@prisma/client";
import { createTypedHooks } from "easy-peasy";
import useSwr from "swr";
import { CustomError } from "./error";
import fetcher from "./fetcher";
import { TraxStore } from "./store";

export const useUser = () => {
  const { data, error } = useSwr<
    { user: User; playlistCount: number },
    CustomError
  >("/user", fetcher);
  return {
    user: data?.user,
    playlistCount: data?.playlistCount,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSwr<Playlist[], CustomError>("/playlist", fetcher);
  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<TraxStore>();
