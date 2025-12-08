import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { CreateInventory } from "@/types/inventory.type";

interface BatchRow extends RowDataPacket {
  Batch_ID: number;
}

interface LocationRow extends RowDataPacket {
  Location_ID: number;
}

export async function POST(req: Request) {
  try {
    const body: CreateInventory = await req.json();
    const { Batch_ID, Available_Quantity, Location_ID } = body;

    if (!Batch_ID) {
      return NextResponse.json(
        { error: "Batch_ID is required." },
        { status: 400 }
      );
    }

    if (!Available_Quantity || Available_Quantity < 0) {
      return NextResponse.json(
        { error: "Available_Quantity must be 0 or greater." },
        { status: 400 }
      );
    }

    if (!Location_ID) {
      return NextResponse.json(
        { error: "Location_ID is required." },
        { status: 400 }
      );
    }

    // ---------- CHECK IF BATCH EXISTS ----------
    const [batchRows] = await db.execute<BatchRow[]>(
      "SELECT Batch_ID FROM batch WHERE Batch_ID = ?",
      [Batch_ID]
    );

    if (batchRows.length === 0) {
      return NextResponse.json({ error: "Batch not found." }, { status: 404 });
    }

    // ---------- CHECK IF LOCATION EXISTS ----------
    const [locationRows] = await db.execute<LocationRow[]>(
      "SELECT Location_ID FROM storage_location WHERE Location_ID = ?",
      [Location_ID]
    );

    if (locationRows.length === 0) {
      return NextResponse.json(
        { error: "Location not found." },
        { status: 404 }
      );
    }

    // ---------- INSERT INVENTORY ----------
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO inventory
        (Batch_ID, Available_Quantity, Location_ID)
      VALUES (?, ?, ?)
      `,
      [Batch_ID, Available_Quantity, Location_ID]
    );

    return NextResponse.json({
      success: true,
      Inventory_ID: result.insertId,
    });
  } catch (error) {
    console.error("ERROR CREATING INVENTORY:", error);
    return NextResponse.json(
      { error: "Server error while creating inventory" },
      { status: 500 }
    );
  }
}
