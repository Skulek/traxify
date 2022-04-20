import { NextApiRequest } from "next";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

const data = async (req: NextApiRequest, res: NextApiResponseWithUser) => {
  if (!res.user) {
    res.json("no user found");
    res.status(500);
    return;
  }

  const playlistCount = await prisma.playlist.count({
    where: {
      userId: res.user?.id,
    },
  });
  res.json({ user: res.user, playlistCount });
};

export default validateRoute(data);
