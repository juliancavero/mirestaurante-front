import type { CartaType } from "../carta/carta";
import type { InsertNewItemType } from "../carta/carta";
import { NewOrderType } from "../orders/newOrder";
import { OrderAnswerType } from "../payOrders/detailedOrder";
import { orderType } from "../payOrders/payOrders";
import { TableType } from "../reservations/table";

type CategoriesType = string[];

const ip = 'http://localhost';
const port = '3099';
export const url = ip +':'+ port;

async function fetchData<Parameters, Response>(
    method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
    path: string,
    bod?: Parameters
): Promise<Response> {

    const body = JSON.stringify(bod);

    const response = await fetch(`${url}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    const json = await response.json();
    return json as Response;
}

export function genericFetch(){

    async function getCartaData(): Promise<CartaType>{
        return fetchData<CartaType, CartaType>('GET', '/carta')
    }

    async function getCartaCategories(): Promise<CategoriesType>{
        return fetchData<CartaType, CategoriesType>('GET', '/cartaCategories')
    }

    async function postNewItem(bod: InsertNewItemType): Promise<InsertNewItemType>{
        return fetchData<InsertNewItemType, InsertNewItemType>('POST', '/carta/new', bod)
    }

    async function postNewOrder(bod: NewOrderType): Promise<NewOrderType>{
        return fetchData<NewOrderType, NewOrderType>('POST', '/orders/new', bod)
    }

    async function getOrderData(bod: string): Promise<OrderAnswerType>{
        return fetchData<string, OrderAnswerType>('GET', `/orders/${bod}`)
    }

    async function getAllOrders(): Promise<orderType[]>{
        return fetchData<string, orderType[]>('GET', `/orders`)
    }

    async function getAllReservations(): Promise<TableType[]>{
        return fetchData<string, TableType[]>('GET', `/reservations`)
    }

    async function getTakenReservations(): Promise<TableType[]>{
        return fetchData<string, TableType[]>('GET', `/takenReservations`)
    }

    async function putUpdateReservation(bod: TableType): Promise<TableType>{
        return fetchData<TableType, TableType>('PUT', '/reservations/update', bod)
    }

    async function postNewItemPhoto(bod: FormData): Promise<Response>{
        const response = await fetch(`${url}/cartaItemPhoto`, {
                method: 'POST',
                body: bod
            });
        return response;
    }

    return {
        getCartaData,
        getCartaCategories,
        postNewItem,
        postNewOrder,
        getOrderData,
        getAllOrders,
        getAllReservations,
        putUpdateReservation,
        postNewItemPhoto,
        getTakenReservations
    }
}