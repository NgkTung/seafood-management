import { db } from "@/lib/db";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const permissionMap: Record<string, string[]> = {
  Administrator: ["*"],

  "QC Inspector": ["qc.create", "batch.view"],

  "Warehouse Manager": ["inventory.manage", "batch.view", "shipment.view"],

  "Sales Officer": ["order.create", "customer.view", "product.view"],

  "Export Manager": ["order.approve", "reports.view"],

  "Logistics Staff": ["shipment.create", "documents.manage"],

  Accountant: ["invoice.view", "payments.manage"],

  Director: ["reports.view", "dashboard.view"],

  "IT Support": ["users.manage"],

  Intern: [
    "view.only", // or []
  ],

  "": [],
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

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
    // Fetch permissions from Role table
    const [roleRows]: any = await db.execute(
      "SELECT Role_Name FROM role WHERE Role_ID = ?",
      [user.Role_ID]
    );

    console.log("ROLE ROWS: ", roleRows);

    // Get roleName
    const roleName: string = roleRows[0]?.Role_Name || "";

    // Map to actual permissions
    const permissions = permissionMap[roleName] || [];

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      userId: user.User_ID,
      fullName: user.Full_Name,
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
