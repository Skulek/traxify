import { NextApiRequest } from "next";
import { prisma } from "../../lib/prisma";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    if (req.method === "POST") {
      try {
        const playlist = await prisma.playlist.create({
          data: {
            name: req.body.playlistName,
            songs: {
              connect: req.body.playlistSongs,
            },
            user: {
              connect: {
                email: req.body.userEmail,
              },
            },
          },
        });
        return res.status(200).json(playlist);
      } catch (error) {
        return res.status(500).json({ error: "failed to save playlist" });
      }
    }

    if (res.user === undefined) {
      res.redirect(500, "/");
      return;
    }
    const playlists = await prisma.playlist.findMany({
      where: { userId: res.user.id },
    });
    return res.json(playlists);
  }
);
