import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Customer lookup type
interface CustomerRow extends RowDataPacket {
  Customer_ID: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Customer_ID, Order_Date, Shipping_Date, Status } = body;

    // ---------- VALIDATION ----------
    if (!Customer_ID) {
      return NextResponse.json(
        { error: "Customer_ID is required." },
        { status: 400 }
      );
    }

    if (!Order_Date) {
      return NextResponse.json(
        { error: "Order_Date is required." },
        { status: 400 }
      );
    }

    // Verify customer exists
    const [customerRows] = await db.execute<CustomerRow[]>(
      "SELECT Customer_ID FROM customer WHERE Customer_ID = ?",
      [Customer_ID]
    );

    if (customerRows.length === 0) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    // ---------- INSERT NEW EXPORT ORDER ----------
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO export_order 
        (Customer_ID, Order_Date, Shipping_Date, Status)
      VALUES (?, ?, ?, ?)
      `,
      [
        Customer_ID,
        Order_Date,
        Shipping_Date || null, // can be null
        Status || "Draft", // default value
      ]
    );

    return NextResponse.json({
      success: true,
      Order_ID: result.insertId,
      message: "Export order created successfully!",
    });
  } catch (error) {
    console.error("ERROR CREATING EXPORT ORDER:", error);
    return NextResponse.json(
      { error: "Server error while creating export order" },
      { status: 500 }
    );
  }
}
