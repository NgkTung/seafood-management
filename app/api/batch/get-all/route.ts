import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const query = `
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
      ORDER BY b.Batch_ID ASC
    `;

    const [rows]: any = await db.execute(query);

    return NextResponse.json({ batches: rows });
  } catch (err: any) {
    console.error("ERROR FETCHING BATCHES: ", err);
    return NextResponse.json(
      { error: "Failed to load batches" },
      { status: 500 }
    );
  }
}
