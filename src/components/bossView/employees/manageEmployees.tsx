import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { genericFetch } from "../../utils/fetchData";
import { MenuButton } from "../../utils/menuButton";
import { Employee } from "../../utils/types";
import { DetailedEmployeeData } from "./detailedEmployeeData";
import { EmployeeCategoryTable } from "./employeeCategoryTable";
import { NewEmployee } from "./newEmployee";

export type orderedEmployees = {
  waiters: Employee[];
  managers: Employee[];
  owners: Employee[];
};
export function ManageEmployees() {
  const { getEmployeesData } = genericFetch();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [orderedEmployees, setOrderedEmployees] = useState<orderedEmployees>();
  const [detailedData, setDetailedData] = useState<Employee | undefined>();
  const [showNewEmployeeMenu, setShowNewEmployeeMenu] = useState(false);

  useEffect(() => {
    getEmployeesData().then((data) => {
      setEmployees(data);
    });
  }, []);

  useEffect(() => {
    const waiters = employees.filter((each) => each.role === "Waiter");
    const managers = employees.filter((each) => each.role === "Manager");
    const owners = employees.filter((each) => each.role === "Owner");

    setOrderedEmployees({
      waiters: waiters,
      managers: managers,
      owners: owners,
    });
  }, [employees]);

  function showNewEmployee() {
    setShowNewEmployeeMenu(!showNewEmployeeMenu);
  }

  return (
    <div className="row m-3">
      <div className="col-md-6">
        {orderedEmployees ? (
          <Table responsive>
            <EmployeeCategoryTable
              orderedEmployees={orderedEmployees}
              setDetailedData={setDetailedData}
            />
          </Table>
        ) : null}
      </div>
      <div className="col-md-6">
        <div className="row">
          <button
            onClick={showNewEmployee}
            className="col-md-12 btn btn-success btn-lg"
          >
            Registrar empleado
          </button>
        </div>
        {showNewEmployeeMenu ? (
          <div className="row">
            <NewEmployee />
          </div>
        ) : null}
        <div className="row">
          {detailedData ? (
            <DetailedEmployeeData detailedData={detailedData} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
