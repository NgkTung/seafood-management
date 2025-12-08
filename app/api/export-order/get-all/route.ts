import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExportOrderRow } from "@/types/export-order.type";

export async function GET() {
  try {
    const [rows] = await db.execute<ExportOrderRow[]>(
      `
        SELECT 
          Order_ID,
          Customer_ID,
          Order_Date,
          Shipping_Date,
          Status
        FROM export_order
        ORDER BY Order_ID ASC
      `
    );

    return NextResponse.json({
      success: true,
      orders: rows,
    });
  } catch (error) {
    console.error("ERROR FETCHING EXPORT ORDERS:", error);
    return NextResponse.json(
      { error: "Server error while fetching export orders" },
      { status: 500 }
    );
  }
}
