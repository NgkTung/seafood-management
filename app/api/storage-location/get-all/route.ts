import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { StorageLocationRow } from "@/types/storage-location.type";

export async function GET() {
  try {
    const query = `
      SELECT 
        Location_ID,
        Location_Name,
        Capacity
      FROM storage_location
      ORDER BY Location_ID ASC
    `;

    const [rows] = await db.execute(query);

    return NextResponse.json({
      locations: rows as StorageLocationRow[],
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to load storage locations" },
      { status: 500 }
    );
  }
}
