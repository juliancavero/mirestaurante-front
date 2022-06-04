import { useEffect, useState } from "react";
import { AreYouSureWindow } from "../../utils/areYouSureWindow";
import { DeleteButton } from "../../utils/DeleteButton";
import { genericFetch, ip } from "../../utils/fetchData";
import { ItemResponse } from "../../utils/types";

type CartaItemManager = ItemResponse & {
  showDeleteOptions?: boolean;
};

export function CartaItem(props: CartaItemManager) {
  const { deleteCartaItem } = genericFetch();
  const { name, price, photo, showDeleteOptions } = props;
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(false);
  const [confirmWindowVisible, setConfirmWindowVisible] = useState(false);

  function windowVisible() {
    setConfirmWindowVisible(!confirmWindowVisible);
  }

  useEffect(() => {
    if (confirmDeleteItem) {
      const bod = { name: name };
      deleteCartaItem(bod).then((response) => {
        window.alert("Artículo " + name + " eliminado correctamente.");
        window.location.reload();
      });
    }
  }, [confirmDeleteItem]);

  return (
    <tr className="row">
      <td className="col-md-5 m-auto">{name}</td>
      <td className="col-md-3 m-auto">{price} €</td>
      <td className="col-md-3 image-td">
        <img
          className="cartaImage  m-auto"
          alt={name}
          src={ip + "/statics/" + photo}
        ></img>
      </td>
      {showDeleteOptions ? (
        <DeleteButton
          showConfirmationWindow={windowVisible}
          assignedClass="col-md-1 d-flex justify-content-center align-items-center"
        />
      ) : null}
      {confirmWindowVisible ? (
        <AreYouSureWindow
          setConfirmation={setConfirmDeleteItem}
          createConfirmationWindow={windowVisible}
          goodOption={"Borrar artículo " + name}
          badOption="Cancelar"
        />
      ) : null}
    </tr>
  );
}
