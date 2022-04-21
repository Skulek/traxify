import { NextApiRequest } from "next";
import { prisma } from "../../lib/prisma";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    if (res.user === undefined) {
      res.redirect(500, "/");
      return;
    }
    const playlists = await prisma.playlist.findMany({
      where: { userId: res.user.id },
    });
    res.json(playlists);
  }
);
