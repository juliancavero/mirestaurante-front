import { ObjectId } from "mongodb";


export type CartaType = CategoriaType[];

export type CategoriaType = {
    name: string;
    items: ItemResponse[];
}
export type NewCategoriaType = {
    name: string;
}

export type ItemResponse = Item & {
    _id: ObjectId;
}

export type NewItemType = {
    name: string;
    items: Item;
}

export type Item = {
    name: string;
    price: number;
    photo: string;
}

export type NewOrderType = {
    name: string;
    items: ItemSendType[];
}

export type ItemSendType = {
    name: string;
    price: number;
    photo: string;
}

export type OrderAnswerType = {
    _id: ObjectId,
    name: string,
    tableId: number,
    items: Item[],
    totalCost: number
}

export type OrderType = {
    _id: ObjectId;
    name: string;
    tableId: number;
    items: Item[];
    totalCost: number;
}

export type TableType = {
    id: number;
    status: "Available" | "Reserved" | "Taken";
    size: number;
    name?: string | undefined;
}

export type UpdateTableType = {
    id: number;
    status: string;
    size: number;
    name?: string | undefined;
}

export type NewTableType = {
    size: number;
}

export type PayOrderType = {
    tableId: number;
}
