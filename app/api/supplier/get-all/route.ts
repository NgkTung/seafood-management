import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        Supplier_ID,
        Supplier_Name,
        Address,
        Phone,
        Status
      FROM supplier
      ORDER BY Supplier_ID ASC
    `;

    const [rows]: any = await db.execute(query);

    return NextResponse.json({ suppliers: rows });
  } catch (err: any) {
    console.error("ERROR FETCHING SUPPLIERS:", err);
    return NextResponse.json(
      { error: "Failed to load suppliers" },
      { status: 500 }
    );
  }
}
