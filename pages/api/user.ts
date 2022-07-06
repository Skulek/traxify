import { NextApiRequest } from "next";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const data = async (req: NextApiRequest, res: NextApiResponseWithUser) => {
  if (!res.user) {
    res.status(400).json({ message: "no user found" });
    return;
  }

  const playlistCount = await prisma.playlist.count({
    where: {
      userId: res.user?.id,
    },
  });
  res.status(200).json({ user: res.user, playlistCount });
};

export default validateRoute(data);
