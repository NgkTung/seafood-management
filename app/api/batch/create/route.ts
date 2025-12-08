import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { CreateBatch } from "@/types/batch.type";

// Define supplier row structure
interface SupplierRow extends RowDataPacket {
  Supplier_ID: number;
  Status: string;
}

export async function POST(req: Request) {
  try {
    const body: CreateBatch = await req.json();
    const { Supplier_ID, Product_ID, Date_Received, Weight } = body;

    if (!Weight || Weight <= 0) {
      return NextResponse.json(
        { error: "Weight must be greater than zero." },
        { status: 400 }
      );
    }

    if (!Date_Received) {
      return NextResponse.json(
        { error: "Date received is required." },
        { status: 400 }
      );
    }

    const [supplierRows] = await db.execute<SupplierRow[]>(
      "SELECT Supplier_ID, Status FROM supplier WHERE Supplier_ID = ?",
      [Supplier_ID]
    );

    if (supplierRows.length === 0) {
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

    // ---------- INSERT NEW BATCH ----------
    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO batch
          (Supplier_ID, Product_ID, Date_Received, Weight, Status)
        VALUES (?, ?, ?, ?, ?)
      `,
      [Supplier_ID, Product_ID, Date_Received, Weight, "Pending"]
    );

    return NextResponse.json({
      success: true,
      Batch_ID: result.insertId,
    });
  } catch (error) {
    console.error("ERROR CREATING BATCH:", error);
    return NextResponse.json(
      { error: "Server error while creating batch" },
      { status: 500 }
    );
  }
}
