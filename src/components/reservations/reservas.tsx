import { useEffect, useState } from "react"
import { Table } from './table';
import './reservationWindow.css';
import { genericFetch } from "../miscelaneous/fetchData";

type TableType = {
    id: number;
    status: "Available" | "Reserved" | "Taken";
    size: number;
    name?: string | undefined;
}

export function Reservas() {
    const { getAllReservations } = genericFetch();
    const [reservations, setReservations] = useState<TableType[]>([]);

    useEffect(() => {
        /* fetch('http://192.168.0.20:3099/reservations')
            .then(response => response.json())
            .then(response => setReservations(response)) */

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