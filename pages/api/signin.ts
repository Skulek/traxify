import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CustomError } from "../../lib/error";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<boolean | CustomError>
) => {
  const { email, password } = req.body;
  let user: User | null;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong - try again" });
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ message: "Invalid Password - try again" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    process.env.APP_SECRET,
    {
      expiresIn: "8h",
    }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(process.env.APP_SECRET, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.json(!user);
};
