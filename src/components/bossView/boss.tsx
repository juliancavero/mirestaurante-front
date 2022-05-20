import { MenuButton } from "../utils/menuButton";

export function Boss(){
    return (
        <div id='main'>
            <div className="row">
                <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
                    <MenuButton content='EVOLUCIÓN ECONÓMICA' url='income' />
                    <img src="../images/ingresos.png" alt=""></img>
                </div>
                <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
                    <MenuButton content='ADMINISTRAR EMPLEADOS' url='employees'/>
                    <img src='/images/empleados.png' alt=""></img>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
                    <MenuButton content='MI EMPRESA' url='mycompany'/>
                    <img src='/images/company.png' alt=""></img>
                </div>
                <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
                    <MenuButton content='OPERATIVA RESTAURANTE' url='income'/>
                    <img src='/images/operativa.png' alt=""></img>
                </div>
            </div>
        </div>
    )
}