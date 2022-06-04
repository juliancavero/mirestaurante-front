import { Key, useContext, useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { Employee } from "../../utils/types";

type DetailedEmployeeDataProps = {
  detailedData: Employee;
};

export function DetailedEmployeeData({
  detailedData,
}: DetailedEmployeeDataProps) {
  const [newName, setNewName] = useState<string>(detailedData.name);
  const [newPaySlip, setNewPayslip] = useState<number>(detailedData.payslip);
  const [newUserName, setNewUserName] = useState<string>(detailedData.userName);
  const [dataChanged, setDataChanged] = useState(false);
  const [newRole, setNewRole] = useState<"Waiter" | "Manager" | "Owner">(
    detailedData.role
  );

  const { putEmployeeData } = genericFetch();
  useEffect(() => {
    if (
      newName !== detailedData.name ||
      newPaySlip !== detailedData.payslip ||
      newUserName !== detailedData.userName ||
      newRole !== detailedData.role
    ) {
      setDataChanged(true);
    }
  }, [newName, newPaySlip, newUserName, newRole]);

  useEffect(() => {
    setNewName(detailedData.name);
    setNewPayslip(detailedData.payslip);
    setNewUserName(detailedData.userName);
    setNewRole(detailedData.role);
  }, [detailedData]);

  function updateInformation() {
    putEmployeeData({
      name: newName,
      payslip: newPaySlip,
      userName: newUserName,
      role: newRole,
      dni: detailedData.dni,
    }).then((response) => {
      if (response) {
        window.location.reload();
      } else {
        window.alert("Request failed");
      }
    });
  }
  return (
    <div className="m-3">
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <span className="h2">Nombre</span>
        </div>
        <div className="col-md-9">
          <input
            value={newName}
            className="h2"
            onChange={(event) => setNewName(event.target.value)}
            defaultValue={detailedData.name}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <span className="h2">Salario</span>
        </div>
        <div className="col-md-9">
          <input
            value={newPaySlip}
            className="h2"
            type={"number"}
            onChange={(event) => setNewPayslip(parseInt(event.target.value))}
            defaultValue={detailedData.payslip}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <span className="h2">Nombre de usuario</span>
        </div>
        <div className="col-md-9">
          <input
            value={newUserName}
            className="h2"
            onChange={(event) => setNewUserName(event.target.value)}
            defaultValue={detailedData.userName}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <span className="h2">Rol</span>
        </div>
        <div className="col-md-9">
          <select
            className="h2"
            defaultValue={detailedData.role}
            onChange={(event) =>
              setNewRole(event.target.value as "Waiter" | "Manager" | "Owner")
            }
          >
            <option value={"Waiter"}>Camarero</option>
            <option value={"Manager"}>Administrador</option>
            <option value={"Owner"}>Propietario</option>
          </select>
        </div>
      </div>
      <div className="row me-3 my-3">
        {dataChanged ? (
          <button onClick={updateInformation} className="btn btn-success ">
            <h2>Guardar cambios</h2>
          </button>
        ) : null}
      </div>
    </div>
  );
}
