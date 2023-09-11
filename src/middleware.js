import {NextResponse} from "next/server";

export default async function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const session = !!req.cookies.get("next-auth.session-token");
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}
