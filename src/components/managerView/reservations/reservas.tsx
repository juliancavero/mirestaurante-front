import React, { useEffect, useState } from "react";
import { Table } from "./table";
import "./reservationWindow.css";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";
import { fadeInAnimation } from "../../utils/estilos";
import { NoData } from "../../utils/noData";
import { NewTableWindow } from "./newTableWindow";
import { DeleteTableWindow } from "./deleteTableWindow";

export function Reservas() {
  const { getAllReservations } = genericFetch();
  const [reservations, setReservations] = useState<TableType[]>([]);
  const [newTableWindow, setNewTableWindow] = useState(false);

  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  useEffect(() => {
    getAllReservations().then((response) => setReservations(response));
  }, []);

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
    <div>
      <div className="d-flex justify-content-end align-items-center">
        <h1 className="me-3">Editar Menú Reservas</h1>
        <button className="" onClick={showEditMenu}>
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

      {reservations.length > 0 ? (
        <div className="tablesDiv">
          {reservations.map((reserv) => (
            <Table key={reserv.id} props={reserv} />
          ))}
        </div>
      ) : (
        <NoData
          str={
            "No hay datos sobre las reservas... todavía. Contacta con un Manager para solucionar este problema."
          }
        />
      )}
    </div>
  );
}
