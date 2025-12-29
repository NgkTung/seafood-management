import { db } from "@/lib/db";

export async function getShipmentsPerMonth() {
  const query = `
    SELECT
      DATE_FORMAT(Shipment_Date, '%Y-%m') AS month,
      COUNT(*) AS shipments
    FROM shipment
    GROUP BY month
    ORDER BY month ASC;
  `;

  const [rows]: any = await db.execute(query);
  return rows;
}
