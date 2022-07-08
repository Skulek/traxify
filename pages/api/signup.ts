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
  const salt = bcrypt.genSaltSync();
  const { email, password, firstName, lastName } = req.body;
  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ message: "User already exists" });
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
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.json(true);
};
