import { Album, Artist, Song } from "@prisma/client";

type Base = {
  id: number;
  name: string;
};

export type SongId = Pick<Song, "id">;
export type PickIdWithName<T extends Base> = Pick<T, "id" | "name">;

export interface SearchResults {
  songs?: Song[];
  artists?: PickIdWithName<Artist>[];
  albums?: PickIdWithName<Album>[];
}
