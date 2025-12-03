import { db } from "@/lib/db";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const permissionMap: Record<string, string[]> = {
  "Full Access": ["*"],

  // You can expand based on your DB values:
  "QC Only": ["qc.create", "batch.view"],
  Warehouse: ["inventory.manage", "shipment.manage"],
  Sales: ["order.create", "customer.view"],
  "Export Manager": ["order.approve", "reports.view"],
  Accountant: ["invoice.view"],
  Director: ["reports.view"],
  Intern: [],

  // fallback
  "": [],
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Fetch user
    const [rows]: any = await db.execute(
      "SELECT User_ID, Full_Name, Role_ID, Password_Hash FROM user WHERE Email = ?",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Verify password
    // const valid = await bcrypt.compare(password, user.Password_Hash);
    // if (!valid) {
    //   return NextResponse.json(
    //     { error: "Invalid credentials" },
    //     { status: 401 }
    //   );
    // }

    // Fetch permissions from Role table
    const [roleRows]: any = await db.execute(
      "SELECT Permissions FROM role WHERE Role_ID = ?",
      [user.Role_ID]
    );

    const permText: string = roleRows[0]?.Permissions || "";

    // Convert text → permissions array
    const permissions = permissionMap[permText] || [];

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      userId: user.User_ID,
      permissions,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // Build response
    const res = NextResponse.json({ success: true });

    // Set HTTP-only cookie
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err) {
    console.log("ERROR: ", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
