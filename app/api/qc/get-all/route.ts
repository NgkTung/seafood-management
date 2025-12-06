import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { QCInspection } from "@/types/qc.type";

export async function GET() {
  try {
    const query = `
      SELECT 
        q.QC_ID,
        q.Batch_ID,
        q.Inspector_ID,
        u.Full_Name AS Inspector_Name,
        q.Moisture,
        q.Temperature,
        q.Grade,
        q.Result,
        q.Inspection_Date
      FROM qc_inspection q
      INNER JOIN user u ON q.Inspector_ID = u.User_ID
      ORDER BY q.QC_ID ASC
    `;

    const [rows] = await db.execute<QCInspection[]>(query);

    return NextResponse.json({ inspections: rows });
  } catch (err) {
    console.error("ERROR FETCHING QC INSPECTIONS: ", err);

    return NextResponse.json(
      { error: "Failed to load QC inspections" },
      { status: 500 }
    );
  }
}
