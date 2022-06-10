import React, { useEffect, useState } from "react";
import type { ItemCart, ItemResponse } from "../../utils/types";
import { url } from "../../utils/fetchData";
import { QuantityWindow } from "./quantityWindow";

type props = {
  setOrderCart: React.Dispatch<React.SetStateAction<ItemCart[]>>;
  orderCart: ItemCart[];
  itemPassed: ItemResponse;
};

export function OrderItem({ setOrderCart, orderCart, itemPassed }: props) {
  const [active, setActive] = useState(false);
  const [quantityWindow, setQuantityWindow] = useState(false);
  const [itemQuantity, setItemQuantity] = useState<number>();

  function showQuantityWindow() {
    setQuantityWindow(!quantityWindow);
  }

  useEffect(() => {
    if (quantityWindow && active) {
      setActive(false);
      setQuantityWindow(false);
      setOrderCart(orderCart.filter((item) => item.name !== itemPassed.name));
    }
  }, [quantityWindow, active]);

  return (
    <div className={"item" + (active ? " selected" : "")}>
      <button onClick={showQuantityWindow}>
        <img
          alt={itemPassed.name}
          src={url + "/statics/" + itemPassed.photo}
        ></img>
      </button>
      <h3>
        {itemPassed.name} - {itemPassed.price}
      </h3>
      {quantityWindow ? (
        <QuantityWindow
          setItemQuantity={setItemQuantity}
          confirmationWindow={setQuantityWindow}
          setOrderCart={setOrderCart}
          orderCart={orderCart}
          setActive={setActive}
          itemPassed={itemPassed}
        />
      ) : null}
    </div>
  );
}
