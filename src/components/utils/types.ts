import { ObjectId } from "mongodb";
import { Order } from "../bossView/income/orderHistory";

export type CartaType = CategoriaType[];

export type CategoriaType = {
  name: string;
  items: ItemResponse[];
};
export type NewCategoriaType = {
  name: string;
};

export type ItemResponse = Item & {
  _id: ObjectId;
};

export type NewItemType = {
  name: string;
  items: Item;
};

export type Item = {
  name: string;
  price: number;
  photo: string;
};

export type NewOrderType = {
  name: string;
  items: ItemSendType[];
};

export type ItemSendType = {
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

export type ItemCart = Item & { quantity: number };

export type OrderAnswerType = {
  _id: ObjectId;
  name: string;
  tableId: number;
  items: ItemSendType[];
  totalCost: number;
};

export type OrderType = {
  _id: ObjectId;
  name: string;
  tableId: number;
  items: ItemSendType[];
  totalCost: number;
};

export type TableType = {
  id: number;
  status: "Available" | "Reserved" | "Taken";
  size: number;
  name?: string | undefined;
};

export type UpdateTableType = {
  id: number;
  status: string;
  size: number;
  name?: string | undefined;
};

export type NewTableType = {
  size: number;
};

export type PayOrderType = {
  tableId: number;
};

export type DeleteItem = {
  name: string;
};

export type DeleteCategory = DeleteItem;

export type DeleteTableType = {
  id: number;
};

export type DailyDataType = {
  dailyData: dailyIncome[];
};

export type dailyIncome = {
  date: string;
  totalIncome: number[];
};

export type Employee = {
  name: string;
  role: "Waiter" | "Manager" | "Owner";
  payslip: number;
  userName: string;
  dni: string;
};

export type PasswordResponse = {
  key: string;
};

export type RegisterUser = {
  name: string;
  userName: string;
  password: string;
  dni: string;
  secretKey: string;
};

export type LoginProps = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  userName?: string;
  token?: string;
};

export type OrderHistoryType = {
  orderHistory: Order[];
};
