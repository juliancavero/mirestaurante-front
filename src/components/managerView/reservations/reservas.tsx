import React, { useEffect, useState } from "react";
import { Table } from "./table";
import "./reservationWindow.css";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";
import { fadeInAnimation } from "../../utils/estilos";
import { NoData } from "../../utils/noData";
import { NewTableWindow } from "./newTableWindow";
import { DeleteTableWindow } from "./deleteTableWindow";
import { ReservationsEdit } from "./reservationsEdit";

export function Reservas() {
  const { getAllReservations } = genericFetch();
  const [reservations, setReservations] = useState<TableType[]>([]);

  useEffect(() => {
    getAllReservations().then((response) => setReservations(response));
  }, []);

  return (
    <div>
      <ReservationsEdit />
      {reservations.length > 0 ? (
        <div className="tablesDiv ">
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
