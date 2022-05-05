import  { CartaType, DeleteCategory, DeleteItem, NewCategoriaType, NewTableType, PayOrderType, UpdateTableType } from "./types";
import { NewItemType } from "./types";
import { NewOrderType } from "./types";
import { OrderAnswerType } from "./types";
import { OrderType } from "./types";
import { TableType } from "./types";

type CategoriesType = string[];

export const ip = 'https://api.mirestaurante.teamcamp.ovh';

const url = ip;

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

    if(response.ok){
        const json = await response.json();
        return json;
    } else {
        // CONTROL ERRORES
        const json = await response.json();
        return json as Response;
    }
    
}

export function genericFetch(){

    async function getCartaData(): Promise<CartaType>{
        return fetchData<CartaType, CartaType>('GET', '/carta')
    }

    async function getCartaCategories(): Promise<CategoriesType>{
        return fetchData<CartaType, CategoriesType>('GET', '/cartaCategories')
    }

    async function postNewItem(bod: NewItemType): Promise<Response>{
        return fetchData<NewItemType, Response>('POST', '/carta/new', bod)
    }

    async function postNewOrder(bod: NewOrderType): Promise<NewOrderType>{
        return fetchData<NewOrderType, NewOrderType>('POST', '/orders/new', bod)
    }

    async function getOrderData(bod: string): Promise<OrderAnswerType>{
        return fetchData<string, OrderAnswerType>('GET', `/orders/${bod}`)
    }

    async function getAllOrders(): Promise<OrderType[]>{
        return fetchData<string, OrderType[]>('GET', `/orders`)
    }

    async function getAllReservations(): Promise<TableType[]>{
        return fetchData<string, TableType[]>('GET', `/reservations`)
    }

    async function getTakenReservations(): Promise<TableType[]>{
        return fetchData<string, TableType[]>('GET', `/takenReservations`)
    }

    async function postNewReservation(bod: NewTableType): Promise<UpdateTableType>{
        return fetchData<NewTableType, UpdateTableType>('POST', '/reservations/new', bod)
    }

    async function putUpdateReservation(bod: UpdateTableType): Promise<UpdateTableType>{
        return fetchData<UpdateTableType, UpdateTableType>('PUT', '/reservations/update', bod)
    }
    async function postNewCategory(bod: NewCategoriaType): Promise<Response>{
        return fetchData<NewCategoriaType, Response>('POST', '/carta/newCategory', bod)
    }

    async function payOrderTable(bod: PayOrderType): Promise<Response>{
        return fetchData<PayOrderType, Response>('DELETE', '/orders/delete', bod)
    }

    async function deleteCartaItem(bod: DeleteItem): Promise<Response>{
        return fetchData<DeleteItem, Response>('DELETE', '/carta/deleteItem', bod)
    }

    async function deleteCartaCategory(bod: DeleteItem): Promise<Response>{
        return fetchData<DeleteItem, Response>('DELETE', '/carta/deleteCategory', bod)
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
        getTakenReservations,
        postNewCategory,
        postNewReservation,
        payOrderTable,
        deleteCartaItem,
        deleteCartaCategory
    }
}