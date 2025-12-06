import { RowDataPacket } from "mysql2";

export interface Batch extends RowDataPacket {
  Batch_ID: number;
  Supplier_ID: number;
  Supplier_Name: string;
  Product_ID: number;
  Product_Name: string;
  Date_Received: string; // or Date if you want
  Weight: number;
  Status: string;
}

export interface CreateBatch {
  Supplier_ID: number;
  Product_ID: number;
  Date_Received: string;
  Weight: number;
}
