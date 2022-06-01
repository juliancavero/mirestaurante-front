import { useState } from "react";
import { Employee } from "../../utils/types";
import "./employees.css";

type EmployeeRowProps = {
  role: string;
  employees: Employee[];
  setDetailedData: React.Dispatch<React.SetStateAction<Employee | undefined>>;
};

export function EmployeeRow({
  role,
  employees,
  setDetailedData,
}: EmployeeRowProps) {
  const [selected, setSelected] = useState(false);

  function handleFocus() {
    setSelected(!selected);
  }
  function displaySelectedEmployee(username: string) {
    setDetailedData(employees.filter((emp) => emp.userName === username)[0]);
  }

  return (
    <>
      {employees.length > 0 ? (
        <>
          <thead>
            <tr>
              <th colSpan={3}>
                <h2>{role}</h2>
              </th>
            </tr>
          </thead>
          <tr>
            <th>Nombre</th>
            <th>Salario</th>
            <th>Nombre de Usuario</th>
          </tr>
          {employees.map((each) => (
            <tr
              className="eachRow"
              tabIndex={0}
              onFocus={handleFocus}
              onClick={() => displaySelectedEmployee(each.userName)}
            >
              <td>{each.name}</td>
              <td>{each.payslip}</td>
              <td>{each.userName}</td>
            </tr>
          ))}
        </>
      ) : null}
    </>
  );
}
