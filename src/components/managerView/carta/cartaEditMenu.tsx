import { useState } from "react";
import { NewCategoryWindow } from "./newCategoryWindow";
import { NewItemWindow } from "./newItemWindow";

type CartaEditMenuProps = {
  show: boolean;
};

export function CartaEditMenu({ show }: CartaEditMenuProps) {
  const [newItemWindow, setNewItemWindow] = useState(false);
  const [newCategoryWindow, setNewCategoryWindow] = useState(false);
  if (!show) return null;

  function toggleItemWindow() {
    setNewItemWindow(!newItemWindow);
  }

  function toggleCategoryWindow() {
    setNewCategoryWindow(!newCategoryWindow);
  }

  return (
    <div className="row d-flex justify-content-around my-3">
      <button
        id="addNewItem"
        className="modifyCartaButton col-md-4"
        onClick={toggleItemWindow}
      >
        Añadir Item
      </button>
      <button
        id="addNewCategory"
        className="modifyCartaButton col-md-4"
        onClick={toggleCategoryWindow}
      >
        Añadir Categoría
      </button>

      {newItemWindow ? (
        <NewItemWindow setVisibility={toggleItemWindow} />
      ) : null}
      {newCategoryWindow ? (
        <NewCategoryWindow setVisibility={toggleCategoryWindow} />
      ) : null}
    </div>
  );
}
