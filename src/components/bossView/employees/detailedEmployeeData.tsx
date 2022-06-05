import { useEffect, useState } from "react";
import { AreYouSureWindow } from "../../utils/areYouSureWindow";
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
  const [confirmDeleteWindow, setConfirmDeleteWindow] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);

  const { putEmployeeData, deleteEmployee } = genericFetch();
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
    if (confirmDeleteUser) {
      const body = { userName: detailedData.userName };
      deleteEmployee(body).then((response) => {
        console.log(response);
        if ("userNameDelete" in response) {
          window.alert(`Empleado borrado correctamente.`);
          window.location.reload();
        }
      });
    }
  }, [confirmDeleteUser]);
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

  function deleteUser() {
    setConfirmDeleteWindow(!confirmDeleteWindow);
  }
  return (
    <div className="row col m-3 rounded px-4 py-4 registerEmployeeBox">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <span className="h2">Nombre</span>
        </div>
        <div className="col-xl-9">
          <input
            value={newName}
            className="form-text form-control-lg"
            onChange={(event) => setNewName(event.target.value)}
            defaultValue={detailedData.name}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <span className="h2">Salario</span>
        </div>
        <div className="col-xl-9">
          <input
            value={newPaySlip}
            className="form-text form-control-lg"
            type={"number"}
            onChange={(event) => setNewPayslip(parseInt(event.target.value))}
            defaultValue={detailedData.payslip}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <span className="h2">Nombre de usuario</span>
        </div>
        <div className="col-xl-9">
          <input
            value={newUserName}
            className="form-text form-control-lg"
            onChange={(event) => setNewUserName(event.target.value)}
            defaultValue={detailedData.userName}
          ></input>
        </div>
      </div>
      <div className="row d-flex justify-content-left">
        <div className="col-xl-3">
          <span className="h2">Rol</span>
        </div>
        <div className="col-xl-5">
          <select
            value={newRole}
            className="form-select form-select-lg"
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
      <div className="row d-flex justify-content-end">
        <div className="col-xl-3">
          <button onClick={deleteUser} className="btn btn-danger btn-lg">
            Eliminar usuario
          </button>
          {confirmDeleteWindow ? (
            <AreYouSureWindow
              badOption="Cancelar"
              goodOption="Confirmar"
              setConfirmation={setConfirmDeleteUser}
              createConfirmationWindow={deleteUser}
            />
          ) : null}
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
