import { useEffect, useState } from "react"
import { Table } from './table';
import './reservationWindow.css';
import { genericFetch } from "../utils/fetchData";
import { TableType } from "../utils/types";

export function Reservas() {
    const { getAllReservations } = genericFetch();
    const [reservations, setReservations] = useState<TableType[]>([]);

    useEffect(() => {
        getAllReservations().then(response => setReservations(response));
    }, []);

    return (
        <div className="tablesDiv">
            {
                reservations.map((reserv) =>
                    <div>
                        <Table props={reserv}/>
                    </div>
                )
            }
        </div>
    )
}