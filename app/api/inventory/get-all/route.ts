import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { InventoryRow } from "@/types/inventory.type";

export async function GET() {
  try {
    const query = `
      SELECT 
        i.Batch_ID,
        i.Available_Quantity,
        i.Location_ID,
        sl.Location_Name,
        b.Product_ID,
        p.Species AS Product_Name,
        b.Supplier_ID,
        s.Supplier_Name,
        b.Date_Received,
        b.Status AS Batch_Status
      FROM inventory i
      INNER JOIN batch b ON i.Batch_ID = b.Batch_ID
      INNER JOIN product p ON b.Product_ID = p.Product_ID
      INNER JOIN supplier s ON b.Supplier_ID = s.Supplier_ID
      LEFT JOIN storage_location sl ON i.Location_ID = sl.Location_ID
      ORDER BY i.Batch_ID ASC
    `;

    const [rows] = await db.execute<InventoryRow[]>(query);

    return NextResponse.json({ inventory: rows });
  } catch (err) {
    console.error("ERROR FETCHING INVENTORY: ", err);
    return NextResponse.json(
      { error: "Failed to load inventory" },
      { status: 500 }
    );
  }
}
