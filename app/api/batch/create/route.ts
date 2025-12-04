import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// CREATE NEW BATCH
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { supplierId, productId, dateReceived, weight } = body;

    // Business rule: weight > 0
    if (!weight || weight <= 0) {
      return NextResponse.json(
        { error: "Weight must be greater than zero." },
        { status: 400 }
      );
    }

    // Business rule: batch must have date received
    if (!dateReceived) {
      return NextResponse.json(
        { error: "Date received is required." },
        { status: 400 }
      );
    }

    // Business rule: supplier must be active
    const [supplierRows]: any = await db.execute(
      "SELECT Supplier_ID, Status FROM supplier WHERE Supplier_ID = ?",
      [supplierId]
    );

    if (!supplierRows.length) {
      return NextResponse.json(
        { error: "Supplier not found." },
        { status: 404 }
      );
    }

    if (supplierRows[0].Status !== "Active") {
      return NextResponse.json(
        { error: "Supplier is not active." },
        { status: 400 }
      );
    }

    // Create batch
    const [result]: any = await db.execute(
      `
      INSERT INTO batch
        (Supplier_ID, Product_ID, Date_Received, Weight, Status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [supplierId, productId, dateReceived, weight, "Pending"]
    );

    return NextResponse.json({
      success: true,
      batchId: result.insertId,
    });
  } catch (err: any) {
    console.error("ERROR CREATING BATCH: ", err);
    return NextResponse.json(
      { error: "Server error while creating batch" },
      { status: 500 }
    );
  }
}
