import { CategoriaType } from "../../utils/types";
import { CartaItem } from "./cartaItem";

export function CartaCategory(props: CategoriaType) {
  const { name, items } = props;

  return (
    <>
      <tr className="row title bg-success">
        <td className="col-md-12" colSpan={3}>
          {name}
        </td>
      </tr>
      {items.map((item) => (
        <CartaItem
          key={item.name}
          _id={item._id}
          name={item.name}
          price={item.price}
          photo={item.photo}
        />
      ))}
    </>
  );
}
