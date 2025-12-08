import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ExportOrderRow } from "@/types/export-order.type";

export async function GET() {
  try {
    const [rows] = await db.execute<ExportOrderRow[]>(
      `
        SELECT 
          eo.Order_ID,
          eo.Customer_ID,
          c.Customer_Name,
          eo.Order_Date,
          eo.Shipping_Date,
          eo.Status
        FROM export_order eo
        JOIN customer c ON eo.Customer_ID = c.Customer_ID
        ORDER BY eo.Order_ID ASC
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
