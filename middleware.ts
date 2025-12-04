import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const pagePermissions = {
  "/qc": ["qc.create"],
  "/batches": ["batch.view"],
  "/inventory": ["inventory.manage"],
  "/orders": ["order.create"],
  "/reports": ["reports.view"],
  "/shipment": ["shipment.manage"],
  "/admin": ["*"],
};

const PUBLIC_ROUTES = ["/login", "/unauthorized"];

// Convert secret to Uint8Array for jose
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  return new TextEncoder().encode(secret);
};

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // ✅ If user is logged in and tries to access /login, redirect to dashboard
  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      console.log("Invalid token");
      return NextResponse.next();
    }
  }

  // ✅ Allow access to public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 1️⃣ Require auth for all protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Decode token
  let decoded = null;
  try {
    const verified = await jwtVerify(token, getJwtSecret());
    decoded = verified.payload;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { permissions = [] } = decoded;

  // 3️⃣ Check permissions
  const matched = Object.keys(pagePermissions).find((p) =>
    pathname.startsWith(p)
  );

  if (!matched) return NextResponse.next();

  const required = pagePermissions[matched];

  if (permissions.includes("*")) return NextResponse.next();

  const allowed = required.every((r) => permissions.includes(r));

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
