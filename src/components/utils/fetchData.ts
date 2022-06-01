import {
  CartaType,
  DailyDataType,
  DeleteCategory,
  DeleteItem,
  DeleteTableType,
  Employee,
  NewCategoriaType,
  NewTableType,
  PasswordResponse,
  PayOrderType,
  RegisterUser,
  UpdateTableType,
} from "./types";
import { NewItemType } from "./types";
import { NewOrderType } from "./types";
import { OrderAnswerType } from "./types";
import { OrderType } from "./types";
import { TableType } from "./types";

type CategoriesType = string[];

export const ip = "http://192.168.0.20:3099";

const production = false;

const url = production ? "http://api.mirestaurante.teamcamp.ovh" : ip;

async function fetchData<Parameters, Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  bod?: Parameters
): Promise<Response> {
  const body = JSON.stringify(bod);

  let response;

  if (method === "POST" || method === "PUT" || method === "DELETE") {
    response = await fetch(`${url}${path}`, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });
  } else {
    response = await fetch(`${url}${path}`, {
      method: method,
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body,
    });
  }

  if (response?.ok) {
    return await response.json();
  } else {
    // CONTROL ERRORES
    const json = await response?.json();
    return json as Response;
  }
}

export function genericFetch() {
  async function getCartaData(): Promise<CartaType> {
    return fetchData<CartaType, CartaType>("GET", "/carta");
  }

  async function getCartaCategories(): Promise<CategoriesType> {
    return fetchData<CartaType, CategoriesType>("GET", "/cartaCategories");
  }

  async function postNewItem(bod: NewItemType): Promise<Response> {
    return fetchData<NewItemType, Response>("POST", "/carta/new", bod);
  }

  async function postNewOrder(bod: NewOrderType): Promise<NewOrderType> {
    return fetchData<NewOrderType, NewOrderType>("POST", "/orders/new", bod);
  }

  async function getOrderData(bod: string): Promise<OrderAnswerType> {
    return fetchData<string, OrderAnswerType>("GET", `/orders/${bod}`);
  }

  async function getAllOrders(): Promise<OrderType[]> {
    return fetchData<string, OrderType[]>("GET", `/orders`);
  }

  async function getAllReservations(): Promise<TableType[]> {
    return fetchData<string, TableType[]>("GET", `/reservations`);
  }

  async function getTakenReservations(): Promise<TableType[]> {
    return fetchData<string, TableType[]>("GET", `/takenReservations`);
  }

  async function postNewReservation(
    bod: NewTableType
  ): Promise<UpdateTableType> {
    return fetchData<NewTableType, UpdateTableType>(
      "POST",
      "/reservations/new",
      bod
    );
  }

  async function putUpdateReservation(
    bod: UpdateTableType
  ): Promise<UpdateTableType> {
    return fetchData<UpdateTableType, UpdateTableType>(
      "PUT",
      "/reservations/update",
      bod
    );
  }
  async function postNewCategory(bod: NewCategoriaType): Promise<Response> {
    return fetchData<NewCategoriaType, Response>(
      "POST",
      "/carta/newCategory",
      bod
    );
  }

  async function payOrderTable(bod: PayOrderType): Promise<Response> {
    return fetchData<PayOrderType, Response>("DELETE", "/orders/delete", bod);
  }

  async function deleteCartaItem(bod: DeleteItem): Promise<Response> {
    return fetchData<DeleteItem, Response>("DELETE", "/carta/deleteItem", bod);
  }

  async function deleteCartaCategory(bod: DeleteCategory): Promise<Response> {
    return fetchData<DeleteCategory, Response>(
      "DELETE",
      "/carta/deleteCategory",
      bod
    );
  }

  async function deleteReservationTable(
    bod: DeleteTableType
  ): Promise<Response> {
    return fetchData<DeleteTableType, Response>("DELETE", "/reservations", bod);
  }

  async function postNewItemPhoto(bod: FormData): Promise<Response> {
    const response = await fetch(`${url}/cartaItemPhoto`, {
      method: "POST",
      body: bod,
    });
    return response;
  }

  async function getDailyIncomeData(): Promise<DailyDataType> {
    return fetchData<string, DailyDataType>("GET", `/dailyData`);
  }

  async function putNewPassword(bod: string): Promise<string> {
    return fetchData<string, string>("PUT", "/newEmployeeKey", bod);
  }

  async function getPassword(): Promise<PasswordResponse> {
    return fetchData<string, PasswordResponse>("GET", "/newEmployeeKey");
  }

  async function getEmployeesData(): Promise<Employee[]> {
    return fetchData<string, Employee[]>("GET", "/employees");
  }

  async function putEmployeeData(bod: Employee): Promise<boolean> {
    return fetchData<Employee, boolean>("PUT", "/employees", bod);
  }

  async function postEmployeeData(bod: Employee): Promise<boolean> {
    return fetchData<Employee, boolean>("POST", "/employees", bod);
  }

  async function registerUser(bod: RegisterUser): Promise<Response> {
    return fetchData<RegisterUser, Response>("POST", "/register", bod);
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
    deleteCartaCategory,
    deleteReservationTable,
    getDailyIncomeData,
    getEmployeesData,
    putNewPassword,
    getPassword,
    putEmployeeData,
    postEmployeeData,
    registerUser,
  };
}
