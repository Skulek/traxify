import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prisma";

type JWTPayload = JwtPayload & {
  id: string;
};

export type NextApiResponseWithUser<T = any> = NextApiResponse<T> & {
  user?: User;
};

export const getUserIdFromJwt = (token: string) => {
  try {
    const { id } = jwt.verify(token, process.env.APP_SECRET) as JWTPayload;
    return +id;
  } catch {
    return 0;
  }
};

export const validateRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    const token = req.cookies[process.env.APP_SECRET];
    const id = getUserIdFromJwt(token);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.user = user ?? undefined;

    return handler(req, res);
  };
};
