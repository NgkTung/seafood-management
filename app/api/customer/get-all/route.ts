import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CustomerRow } from "@/types/customer.type";

// Type for returned rows

export async function GET() {
  try {
    const [rows] = await db.execute<CustomerRow[]>(
      `
      SELECT 
        Customer_ID,
        Customer_Name,
        Country,
        Contact_Info
      FROM customer
      ORDER BY Customer_ID ASC
      `
    );

    return NextResponse.json({
      success: true,
      customers: rows,
    });
  } catch (error) {
    console.error("ERROR FETCHING CUSTOMERS:", error);
    return NextResponse.json(
      { error: "Server error while fetching customers" },
      { status: 500 }
    );
  }
}
