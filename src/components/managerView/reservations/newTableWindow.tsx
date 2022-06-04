import { useState } from "react";
import { DeleteButton } from "../../utils/DeleteButton";
import { fadeInAnimation } from "../../utils/estilos";
import { genericFetch } from "../../utils/fetchData";

type props = {
  setVisibility: () => void;
};

export function NewTableWindow({ setVisibility }: props) {
  const { postNewReservation } = genericFetch();

  const posibleSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [newTableSize, setNewTableSize] = useState<number>();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newTableSize !== undefined) {
      const bod = {
        size: newTableSize,
      };
      postNewReservation(bod).then((response) => {
        window.alert("Mesa creada correctamente");
        window.location.reload();
      });
    } else {
      window.alert("No has seleccionado un tamaño de mesa");
    }
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewTableSize(parseInt(event.target.value));
  }

  return (
    <div
      className={"row col-md-4 p-3 popup-window " + fadeInAnimation}
      onSubmit={onSubmit}
    >
      <form>
        <div className="row">
          <div className="row">
            <h1 className="col-md-11 my-auto">Crear nueva mesa</h1>
            <DeleteButton
              assignedClass="col-md-1"
              showConfirmationWindow={setVisibility}
            />
          </div>

          <div className="row my-3">
            <h1 className="col-md-5">Tamaño:</h1>
            <select className="col-md-4" onChange={onChange}>
              {posibleSizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="row d-flex justify-content-center">
            <button className="col-md-5" type={"submit"}>
              Crear mesa
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
