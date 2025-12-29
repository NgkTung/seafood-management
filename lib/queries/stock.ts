import { db } from "@/lib/db";

export async function getStockByLocation() {
  const query = `
    SELECT
      sl.Location_Name AS location,
      SUM(i.Available_Quantity) AS quantity
    FROM inventory i
    JOIN storage_location sl
      ON i.Location_ID = sl.Location_ID
    GROUP BY sl.Location_Name
    ORDER BY sl.Location_Name ASC
  `;

  const [rows] = await db.execute(query);
  return rows;
}
