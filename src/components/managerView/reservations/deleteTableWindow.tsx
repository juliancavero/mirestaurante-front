import { useEffect, useState } from "react";
import { DeleteButton } from "../../utils/DeleteButton";
import { fadeInAnimation } from "../../utils/estilos";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";

type props = {
  setVisibility: () => void;
};

export function DeleteTableWindow({ setVisibility }: props) {
  const { getAllReservations, deleteReservationTable } = genericFetch();
  const [allTables, setAllTables] = useState<TableType[]>([]);
  const [deleteTable, setDeleteTable] = useState<number>();

  useEffect(() => {
    getAllReservations().then((response) => {
      if (response.length > 0) {
        setAllTables(response);
      }
    });
  }, []);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (deleteTable !== undefined) {
      const bod = {
        id: deleteTable,
      };
      console.log(bod);
      deleteReservationTable(bod).then((response) => {
        window.alert("Mesa eliminada correctamente");
        window.location.reload();
      });
    } else {
      window.alert("No has seleccionado ninguna mesa a eliminar.");
    }
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDeleteTable(parseInt(event.target.value));
  }

  return (
    <div
      className={"row col-md-5 p-3 popup-window " + fadeInAnimation}
      onSubmit={onSubmit}
    >
      <form>
        <div className="row">
          <h1 className="col-md-11 my-auto">Eliminar mesa</h1>
          <DeleteButton
            assignedClass="col-md-1"
            showConfirmationWindow={setVisibility}
          />
        </div>

        <div className="row my-3">
          <h1 className="col-md-7">Número de mesa:</h1>
          <select className="col-md-4" onChange={onChange}>
            <option></option>
            {allTables.map((table) => (
              <option value={table.id} key={table.id}>
                Mesa {table.id} - Tamaño {table.size}
              </option>
            ))}
          </select>
        </div>
        <div className="row d-flex justify-content-center">
          <button className="col-md-5" type={"submit"}>
            Eliminar mesa
          </button>
        </div>
      </form>
    </div>
  );
}
