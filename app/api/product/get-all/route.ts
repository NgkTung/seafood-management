import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        Product_ID,
        Species,
        Category,
        Description
      FROM product
      ORDER BY Product_ID ASC
    `;

    const [rows] = await db.execute(query);

    return NextResponse.json({ products: rows });
  } catch (err) {
    console.error("ERROR FETCHING PRODUCTS:", err);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
