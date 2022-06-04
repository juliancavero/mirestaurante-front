import { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { ItemSendType } from "../../utils/types";
import { OrderHistoryTable } from "./orderHistoryTable";

export type Order = {
  name: string;
  totalCost: number;
  date: Date;
  items: ItemSendType[];
};
export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { getOrderHistory } = genericFetch();
  useEffect(() => {
    getOrderHistory().then((response) => {
      if (
        "orderHistory" in response &&
        Array.isArray(response.orderHistory) &&
        response.orderHistory.length > 0
      ) {
        setOrders(response.orderHistory);
      }
    });
  }, []);
  return <OrderHistoryTable orders={orders} />;
}
