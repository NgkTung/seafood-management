import { db } from "@/lib/db";

/**
 * Get QC pass vs fail counts
 */
export async function getQCResultSummary() {
  const query = `
    SELECT
      qi.Result AS result,
      COUNT(*) AS value
    FROM qc_inspection qi
    GROUP BY qi.Result;
  `;

  const [rows] = await db.execute(query);
  return rows;
}
