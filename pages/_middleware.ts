import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/libary"];

export default async function middleware(req: NextRequest) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.ACESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
