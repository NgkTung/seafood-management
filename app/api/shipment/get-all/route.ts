import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      `
      SELECT 
        Shipment_ID,
        Order_ID,
        Shipment_Date,
        Carrier,
        Vehicle_Number
      FROM shipment
      ORDER BY Shipment_ID ASC
      `
    );

    return NextResponse.json({ shipments: rows });
  } catch (error) {
    console.error("Failed to fetch shipments:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipments" },
      { status: 500 }
    );
  }
}
