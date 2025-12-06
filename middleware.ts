import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

type PagePermissionKey =
  | "/qc"
  | "/batches"
  | "/inventory"
  | "/orders"
  | "/reports"
  | "/shipment"
  | "/admin";

type PermissionMap = Record<PagePermissionKey, string[]>;

const pagePermissions: PermissionMap = {
  "/qc": ["qc.create"],
  "/batches": ["batch.view"],
  "/inventory": ["inventory.manage"],
  "/orders": ["order.create"],
  "/reports": ["reports.view"],
  "/shipment": ["shipment.manage"],
  "/admin": ["*"],
};

const PUBLIC_ROUTES = ["/login", "/unauthorized"];

// Define your JWT payload shape
interface AppJWTPayload extends JWTPayload {
  permissions?: string[];
}

const getJwtSecret = () => {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? "");
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded: AppJWTPayload | undefined;

  try {
    const verified = await jwtVerify<AppJWTPayload>(token, getJwtSecret());
    decoded = verified.payload;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const permissions: string[] = decoded.permissions ?? [];

  const matched = (Object.keys(pagePermissions) as PagePermissionKey[]).find(
    (p) => pathname.startsWith(p)
  );

  if (!matched) return NextResponse.next();

  const required = pagePermissions[matched];

  if (permissions.includes("*")) return NextResponse.next();

  const allowed = required.every((perm) => permissions.includes(perm));

  if (!allowed) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/batches/:path*",
    "/qc/:path*",
    "/inventory/:path*",
    "/orders/:path*",
    "/reports/:path*",
    "/shipment/:path*",
    "/admin/:path*",
    "/login",
  ],
};
