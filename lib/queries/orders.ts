import { db } from "@/lib/db";

export async function getOrdersPerMonth() {
  const query = `
    SELECT
      DATE_FORMAT(o.Order_Date, '%Y-%m') AS month,
      COUNT(DISTINCT o.Order_ID) AS orders
    FROM export_order o
    GROUP BY month
    ORDER BY month ASC;
  `;

  const [rows] = await db.execute(query);
  return rows;
}

export async function getRevenuePerMonth() {
  const query = `
    SELECT
      DATE_FORMAT(o.Order_Date, '%Y-%m') AS month,
      SUM(oi.Quantity * oi.Price) AS revenue
    FROM export_order o
    JOIN order_item oi
      ON o.Order_ID = oi.Order_ID
    GROUP BY month
    ORDER BY month ASC;
  `;

  const [rows] = await db.execute(query);
  return rows;
}
