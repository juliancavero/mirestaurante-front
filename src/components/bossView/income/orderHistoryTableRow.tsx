import { Order } from "./orderHistory";

type OrderHistoryTableRowProps = {
  order: Order;
};

export function OrderHistoryTableRow({ order }: OrderHistoryTableRowProps) {
  return (
    <tr>
      <td>{order.name}</td>
      <td>{order.totalCost}</td>
      <td>{order.date.toString()}</td>
      <td>{order.items.length}</td>
    </tr>
  );
}
