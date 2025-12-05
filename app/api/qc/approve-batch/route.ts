import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      Batch_ID,
      Status,
      Inspector_ID,
      Moisture,
      Temperature,
      Grade,
      Result,
    } = body;

    if (!Batch_ID || !Status) {
      return NextResponse.json(
        { error: "Batch_ID and Status are required" },
        { status: 400 }
      );
    }

    const updateQuery = `
      UPDATE batch
      SET Status = ?
      WHERE Batch_ID = ?
    `;

    await db.execute(updateQuery, [Status, Batch_ID]);

    const qcQuery = `
      INSERT INTO qc_inspection 
      (Batch_ID, Inspector_ID, Moisture, Temperature, Grade, Result)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(qcQuery, [
      Batch_ID,
      Inspector_ID || null,
      Moisture || null,
      Temperature || null,
      Grade || null,
      Result || Status,
    ]);

    return NextResponse.json({
      message: "Batch status updated + QC record created",
    });
  } catch (err: any) {
    console.error("ERROR APPROVING BATCH: ", err);
    return NextResponse.json(
      { error: "Failed to approve batch" },
      { status: 500 }
    );
  }
}
