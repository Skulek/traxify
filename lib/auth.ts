import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

type JWTPayload = JwtPayload & {
  id: string;
};

export type NextApiResponseWithUser = NextApiResponse & {
  user?: User;
};

export const validateRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    const token = req.cookies.ACESS_TOKEN;
    let user: User;
    try {
      const { id } = jwt.verify(token, process.env.APP_SECRET!) as JWTPayload;
      user = await prisma.user.findUnique({
        where: { id: +id },
      });
      res.user = user;
    } catch (error) {
      console.log(error);
    }

    return handler(req, res);
  };
};
