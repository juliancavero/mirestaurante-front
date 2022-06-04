import { useEffect, useState } from "react";
import { Table } from "./table";
import "./reservationWindow.css";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";
import { NoData } from "../../utils/noData";

export function Reservas() {
  const { getAllReservations } = genericFetch();
  const [reservations, setReservations] = useState<TableType[]>([]);

  useEffect(() => {
    getAllReservations().then((response) => setReservations(response));
  }, []);

  return (
    <div>
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
