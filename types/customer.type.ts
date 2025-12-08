import { RowDataPacket } from "mysql2";

export interface CustomerRow extends RowDataPacket {
  Customer_ID: number;
  Customer_Name: string;
  Country: string | null;
  Contact_Info: string | null;
}
