import { Table } from "react-bootstrap";
import { Order } from "./orderHistory";
import { OrderHistoryTableRow } from "./orderHistoryTableRow";

type OrderHistoryTableProps = {
  orders: Order[];
};

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  if (orders.length === 0) return null;
  return (
    <>
      <div className="d-flex justify-content-centerNombre de Usuario">
        <h1>Histórico de pedidos</h1>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Nombre del cliente</th>
            <th>Coste del pedido</th>
            <th>Fecha</th>
            <th>Cantidad de platos</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((each) => (
            <OrderHistoryTableRow order={each} />
          ))}
        </tbody>
      </Table>
    </>
  );
}
