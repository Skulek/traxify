import { Song } from "@prisma/client";

export type SongId = Pick<Song, "id">;
