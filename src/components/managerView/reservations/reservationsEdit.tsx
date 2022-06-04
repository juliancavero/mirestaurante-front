import { useState } from "react";
import { DeleteTableWindow } from "./deleteTableWindow";
import { NewTableWindow } from "./newTableWindow";

export function ReservationsEdit() {
  const [newTableWindow, setNewTableWindow] = useState(false);

  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  function showCreateTableWindow() {
    setNewTableWindow(!newTableWindow);
  }
  function showDeleteTableWindow() {
    setShowDeleteOptions(!showDeleteOptions);
  }

  function showEditMenu() {
    setShowEditOptions(!showEditOptions);
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center border border-3 border-warning">
        <h1 className="me-3">Editar Menú Reservas</h1>
        <button onClick={showEditMenu}>
          <img
            className="smallImg"
            src="/images/edit.png"
            alt="Edit icon"
          ></img>
        </button>
      </div>

      {showEditOptions ? (
        <div className="row d-flex justify-content-around my-3">
          <button
            className="col-md-3 m-auto addNewTableButton"
            onClick={showCreateTableWindow}
          >
            Crear nueva mesa
          </button>
          <button
            className="col-md-3 m-auto addNewTableButton"
            onClick={showDeleteTableWindow}
          >
            Eliminar mesa
          </button>

          {newTableWindow ? (
            <NewTableWindow setVisibility={showCreateTableWindow} />
          ) : null}
          {showDeleteOptions ? (
            <DeleteTableWindow setVisibility={showDeleteTableWindow} />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
