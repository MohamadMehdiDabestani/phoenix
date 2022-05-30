import { NextResponse } from "next/server";
export async function middleware(req) {
  const url = req.nextUrl.clone();
  try {
    const post = /panel\/blog\/^\w/;
    // const post = /panel\/blog^\w+\/USDT/;
    console.log();
    if (
      req.page.name === "/panel/blog/[slug]" ||
      req.page.name === "/panel/blog"
    )
      return NextResponse.next();
    const authCookie = req.cookies["authentication_scanner"];
    console.log(authCookie);
    if (authCookie) {
      return NextResponse.next();
    }
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  } catch {
    url.pathname = "/badRequest";
    url.search = "";
    return NextResponse.redirect(url);
  }
}
