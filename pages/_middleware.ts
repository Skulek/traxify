import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist/*"];

export default async function middleware(req: NextRequest) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies[process.env.APP_SECRET];
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
