import { RowDataPacket } from "mysql2";

export interface QCInspection extends RowDataPacket {
  QC_ID: number;
  Batch_ID: number;
  Inspector_ID: number;
  Inspector_Name: string;
  Moisture: number | null;
  Temperature: number | null;
  Grade: string;
  Result: string;
  Inspection_Date: string; // or Date if you prefer
}

export interface QCInspectionApprove {
  Batch_ID: number;
  Inspector_ID: number;
  Moisture: number;
  Temperature: number;
  Grade: string;
  Result: string;
}
