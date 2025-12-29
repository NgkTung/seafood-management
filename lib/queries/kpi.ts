import { db } from "@/lib/db";

export async function getTotalInventory() {
  const [rows]: any = await db.execute(
    "SELECT SUM(Available_Quantity) AS value FROM inventory"
  );
  return rows[0]?.value ?? 0;
}

export async function getOrdersThisMonth() {
  const [rows]: any = await db.execute(`
    SELECT COUNT(*) AS value
    FROM export_order
    WHERE YEAR(Order_Date) = YEAR(CURDATE())
      AND MONTH(Order_Date) = MONTH(CURDATE())
  `);
  return rows[0]?.value ?? 0;
}

export async function getRevenueThisMonth() {
  const [rows]: any = await db.execute(`
    SELECT SUM(oi.Quantity * oi.Price) AS value
    FROM export_order o
    JOIN order_item oi ON o.Order_ID = oi.Order_ID
    WHERE YEAR(o.Order_Date) = YEAR(CURDATE())
      AND MONTH(o.Order_Date) = MONTH(CURDATE())
  `);
  return rows[0]?.value ?? 0;
}
