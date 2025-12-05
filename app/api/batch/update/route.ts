import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Batch_ID, Status, Weight, Date_Received, Product_ID, Supplier_ID } =
      body;

    if (!Batch_ID) {
      return NextResponse.json(
        { error: "Batch_ID is required" },
        { status: 400 }
      );
    }

    let fields = [];
    let values: any[] = [];

    if (Status !== undefined) {
      fields.push("Status = ?");
      values.push(Status);
    }
    if (Weight !== undefined) {
      fields.push("Weight = ?");
      values.push(Weight);
    }
    if (Date_Received !== undefined) {
      fields.push("Date_Received = ?");
      values.push(Date_Received);
    }
    if (Product_ID !== undefined) {
      fields.push("Product_ID = ?");
      values.push(Product_ID);
    }
    if (Supplier_ID !== undefined) {
      fields.push("Supplier_ID = ?");
      values.push(Supplier_ID);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
    }

    values.push(Batch_ID);

    const query = `
      UPDATE batch
      SET ${fields.join(", ")}
      WHERE Batch_ID = ?
    `;

    await db.execute(query, values);

    return NextResponse.json({ message: "Batch updated successfully" });
  } catch (err: any) {
    console.error("ERROR UPDATING BATCH: ", err);
    return NextResponse.json(
      { error: "Failed to update batch" },
      { status: 500 }
    );
  }
}
