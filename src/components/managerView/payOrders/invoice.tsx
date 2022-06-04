import { Table } from "react-bootstrap";
import { OrderType } from "../../utils/types";

type InvoiceProps = {
  orderData: OrderType;
};
export function Invoice({ orderData }: InvoiceProps) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Artículo</th>
          <th>Cantidad</th>
          <th>Precio U.</th>
          <th>Precio Total</th>
        </tr>
      </thead>
      <tbody>
        {orderData
          ? orderData.items.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td>{(item.quantity * item.price).toFixed(2)} €</td>
              </tr>
            ))
          : null}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{orderData?.totalCost} €</td>
        </tr>
      </tbody>
    </Table>
  );
}
