import { NextResponse } from "next/server";
export async function middleware(req) {
  const url = req.nextUrl.clone();
  try {
    if (
      req.page.name === "/panel/blog/[slug]" ||
      req.page.name === "/panel/blog"
    )
      return NextResponse.next();
    const authCookie = req.cookies["authentication_scanner"];
    if (authCookie) {
      return NextResponse.next();
    }
    url.pathname = "/login";
    url.search = "notif=true";
    return NextResponse.redirect(url);
  } catch {
    url.pathname = "/badRequest";
    url.search = "";
    return NextResponse.redirect(url);
  }
}
