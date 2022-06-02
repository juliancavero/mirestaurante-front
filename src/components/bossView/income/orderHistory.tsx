import { useEffect, useState } from "react";
import { ItemSendType } from "../../utils/types";

type Order = {
  name: string;
  totalCost: number;
  date: Date;
  items: ItemSendType[];
};
export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    fetch("http://localhost:3099/orderHistory")
      .then((response) => response.json as unknown as Order[])
      .then((response) => {
        setOrders(response);
      });
  }, []);
  return <>{orders ? orders.map((each) => <h1>{each.name}</h1>) : null}</>;
}
