import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { Batch } from "@/types/batch.type";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = `
      SELECT 
        b.Batch_ID,
        b.Supplier_ID,
        s.Supplier_Name,
        b.Product_ID,
        p.Species AS Product_Name,
        b.Date_Received,
        b.Weight,
        b.Status
      FROM batch b
      INNER JOIN supplier s ON b.Supplier_ID = s.Supplier_ID
      INNER JOIN product p ON b.Product_ID = p.Product_ID
    `;

    const params: string[] = [];

    if (status) {
      query += ` WHERE b.Status = ?`;
      params.push(status);
    }

    query += ` ORDER BY b.Batch_ID ASC`;

    const [rows] = await db.execute<Batch[]>(query, params);

    return NextResponse.json({ batches: rows });
  } catch (err) {
    console.error("ERROR FETCHING BATCHES: ", err);
    return NextResponse.json(
      { error: "Failed to load batches" },
      { status: 500 }
    );
  }
}
