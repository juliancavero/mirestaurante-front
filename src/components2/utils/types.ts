import { ObjectId } from "mongodb";


export type CartaType = CategoriaType[];

export type CategoriaType = {
    name: string;
    items: ItemResponse[];
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

