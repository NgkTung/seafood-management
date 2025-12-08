import { RowDataPacket } from "mysql2";

export interface InventoryRow extends RowDataPacket {
  Batch_ID: number;
  Available_Quantity: number;
  Location_ID: number | null;
  Location_Name: string | null;
  Product_ID: number;
  Product_Name: string;
  Supplier_ID: number;
  Supplier_Name: string;
  Date_Received: string;
  Batch_Status: string;
}

export interface CreateInventory {
  Batch_ID: number;
  Available_Quantity: number;
  Location_ID: number;
}
