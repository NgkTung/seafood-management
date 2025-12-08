import { RowDataPacket } from "mysql2";

export interface ExportOrderRow extends RowDataPacket {
  Order_ID: number;
  Customer_ID: number;
  Order_Date: string;
  Shipping_Date: string;
  Status: string;
}

export interface CreateExportOrder {
  Customer_ID: number;
  Order_Date: string;
  Shipping_Date: string;
  Status: string;
}
