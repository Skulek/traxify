import { NextApiRequest } from "next";
import { prisma } from "../../lib/prisma";
import { validateRoute, NextApiResponseWithUser } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    if (res.user === undefined) {
      res.redirect(500, "/");
      return;
    }
    const songs = await prisma.song.findMany();
    res.json(songs);
  }
);
