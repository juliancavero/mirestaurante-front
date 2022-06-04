import { url } from "../../utils/fetchData";
import { ItemResponse } from "../../utils/types";

export function CartaItem(props: ItemResponse) {
  const { name, price, photo } = props;

  return (
    <tr className="row">
      <td className="col-md-6 m-auto">{name}</td>
      <td className="col-md-3 m-auto">{price} €</td>
      <td className="col-md-3 image-td">
        <img
          className="cartaImage  m-auto"
          alt={name}
          src={url + "/statics/" + photo}
        ></img>
      </td>
    </tr>
  );
}
