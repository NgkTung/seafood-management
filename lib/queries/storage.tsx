import { db } from "@/lib/db";

export async function getStorageUtilization() {
  const query = `
    SELECT
      sl.Location_Name AS location,
      SUM(i.Available_Quantity) AS used,
      sl.Capacity AS capacity,
      ROUND(
        (SUM(i.Available_Quantity) / sl.Capacity) * 100,
        2
      ) AS utilization
    FROM inventory i
    JOIN storage_location sl
      ON i.Location_ID = sl.Location_ID
    GROUP BY sl.Location_Name, sl.Capacity
    ORDER BY sl.Location_Name ASC;
  `;

  const [rows]: any = await db.execute(query);
  return rows;
}
