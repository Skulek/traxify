import { NextApiRequest } from "next";
import { Album, Artist, Song } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";

type Base = {
  id: number;
  name: string;
};
export type PickIdWithName<T extends Base> = Pick<T, "id" | "name">;

export interface SearchResults {
  songs?: Song[];
  artists?: PickIdWithName<Artist>[];
  albums?: PickIdWithName<Album>[];
}

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseWithUser<SearchResults>) => {
    const { searchTerm } = req.query;

    if (typeof searchTerm === "object") {
      return;
    }
    if (res.user === undefined) {
      res.redirect(500, "/");
      return;
    }
    const songs = prisma.song.findMany({
      where: {
        name: {
          search: searchTerm,
        },
      },
    });

    const artists = prisma.artist.findMany({
      where: {
        name: {
          search: searchTerm,
        },
      },
      select: {
        name: true,
        id: true,
      },
    });

    const albums = prisma.album.findMany({
      where: {
        name: {
          search: searchTerm,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    const data = await Promise.all([albums, artists, songs]).then((results) => {
      return {
        albums: results[0],
        artists: results[1],
        songs: results[2],
      };
    });
    res.json(data);
  }
);
