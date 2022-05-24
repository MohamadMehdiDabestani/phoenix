import { NextResponse } from "next/server"; 
export async function middleware(req) {
  const url = req.nextUrl.clone();
  try {
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
    return NextResponse.rewrite(url);
  }
}
