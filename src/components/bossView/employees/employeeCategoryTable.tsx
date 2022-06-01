import { Employee } from "../../utils/types";
import { EmployeeRow } from "./employeeRow";
import { orderedEmployees } from "./manageEmployees";


type EmployeeCategoryTableProps = {
    orderedEmployees: orderedEmployees;
    setDetailedData: React.Dispatch<React.SetStateAction<Employee | undefined>>;
}

export function EmployeeCategoryTable({ orderedEmployees, setDetailedData }: EmployeeCategoryTableProps){
    
    return(
        <>
            <EmployeeRow role="Camareros" employees={orderedEmployees.waiters} setDetailedData={setDetailedData} />
            <EmployeeRow role="Administradores" employees={orderedEmployees.managers} setDetailedData={setDetailedData} />
            <EmployeeRow role="Propietarios" employees={orderedEmployees.owners} setDetailedData={setDetailedData} />
        </>
    )
}