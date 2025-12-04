import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((x) => x.startsWith("token="))
      ?.split("=")[1];

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const { payload } = await jwtVerify(token, getSecret());

    return NextResponse.json({ user: payload });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
