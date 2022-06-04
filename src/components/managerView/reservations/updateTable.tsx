import React, { FormEvent, useEffect, useState } from "react";
import { DeleteButton } from "../../utils/DeleteButton";
import { fadeInAnimation } from "../../utils/estilos";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";

type TablePropsType = {
  props: TableType;
  closeWindow: () => void;
};

export function UpdateTable({ props, closeWindow }: TablePropsType) {
  const { putUpdateReservation } = genericFetch();
  const statuses = ["Available", "Taken", "Reserved"];
  const { id, status, size, name } = props;

  const [newStatus, setNewStatus] = useState<string>(status);
  const [newName, setNewName] = useState<string>(name || "");
  const [ada, setAda] = useState<string>("");
  const [changeReservation, setChangeReservation] = useState(false);
  const [newNameVisible, setNewNameVisible] = useState(false);

  useEffect(() => {
    if (status === "Reserved") {
      setAda("Reservada");
    }
    if (status === "Taken") {
      setAda("Ocupada");
    }
  }, [status]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    const bod = {
      id: id,
      status: newStatus,
      size: size,
      name: newName,
    };
    putUpdateReservation(bod).then((response) => {
      window.alert("Reserva cambiada correctamente");
      window.location.reload();
    });
  }

  function showChangeWindow() {
    setChangeReservation(!changeReservation);
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setNewStatus(event.target.value);
  }

  useEffect(() => {
    if (newStatus !== "Available") {
      setNewNameVisible(true);
    } else {
      setNewNameVisible(false);
    }
  }, [newStatus]);

  return (
    <div className={"row col-md-5 p-3 popup-window  " + fadeInAnimation}>
      <div className="row">
        <h1 className="col-md-11 d-flex justify-content-center">Mesa {id}</h1>
        <DeleteButton
          assignedClass="col-md-1"
          showConfirmationWindow={closeWindow}
        />
      </div>

      <div className="row">
        <h1 className="col-md-11">Tamaño: {size} personas</h1>
      </div>
      <div className="row my-3">
        {status === "Reserved" || status === "Taken" ? (
          <h1 className="col-md-11">
            {ada} por {name}
          </h1>
        ) : (
          <h1 className="col-md-11">Disponible</h1>
        )}
      </div>
      <div className="row mb-3 d-flex justify-content-center">
        <button className="col-sm-4" onClick={showChangeWindow}>
          Cambiar Reserva
        </button>
      </div>

      {changeReservation ? (
        <div className={fadeInAnimation}>
          <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <select className="col-md-6" onChange={onChange}>
                {statuses.map((eachStatus) =>
                  eachStatus === status ? (
                    <option key={eachStatus} selected>
                      {eachStatus}
                    </option>
                  ) : (
                    <option key={eachStatus}>{eachStatus}</option>
                  )
                )}
              </select>
            </div>
            {newNameVisible ? (
              <div className="row mb-3">
                <label className="col-md-3" htmlFor="name">
                  Nombre:{" "}
                </label>
                <input
                  className="col-md-6"
                  required
                  onChange={(event) => setNewName(event.target.value)}
                  name="name"
                  type={"text"}
                ></input>
              </div>
            ) : null}

            <div className="row mb-3 d-flex justify-content-center">
              <button className="col-sm-8" type={"submit"}>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
