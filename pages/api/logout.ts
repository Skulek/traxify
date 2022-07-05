import { NextApiRequest } from "next";
import cookie from "cookie";
import { NextApiResponseWithUser, validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseWithUser) => {
    const actualCookie = req.cookies[process.env.APP_SECRET];
    if (actualCookie) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(process.env.APP_SECRET, actualCookie, {
          httpOnly: true,
          maxAge: 0,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );
    }
    res.redirect(307, "/signin");
  }
);
