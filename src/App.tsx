import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Camarero as CamareroMenu } from "./components/waiterView/camarero";
import { Manager } from "./components/managerView/manager";
import { Boss } from "./components/bossView/boss";
import { Reservas as CamareroReservas } from "./components/waiterView/reservations/reservas";
import { Carta as CamareroCarta } from "./components/waiterView/carta/carta";
import { NewOrder as CamareroNewOrder } from "./components/waiterView/orders/newOrder";
import { PayOrders as CamareroPayOrders } from "./components/waiterView/payOrders/payOrders";
import { DetailedOrder as CamareroDetailedOrder } from "./components/waiterView/payOrders/detailedOrder";

import { Reservas as ManagerReservas } from "./components/managerView/reservations/reservas";
import { Carta as ManagerCarta } from "./components/managerView/carta/carta";
import { NewOrder as ManagerNewOrder } from "./components/managerView/orders/newOrder";
import { PayOrders as ManagerPayOrders } from "./components/managerView/payOrders/payOrders";
import { DetailedOrder as ManagerDetailedOrder } from "./components/managerView/payOrders/detailedOrder";

import { LogIn } from "./components/main/logIn";
import { ReactComponent as HomeSVG } from "./homeIcon.svg";
import { ReactComponent as MiRestauranteLogo } from "./mirestaurantelogo.svg";
import { GoBackButton } from "./components/main/goBack";
import { ManageEmployees } from "./components/bossView/employees/manageEmployees";
import { MyCompanyData } from "./components/bossView/mycompany/myCompanyData";
import { IncomeData } from "./components/bossView/income/incomeData";
import { RegisterPage } from "./components/main/registerPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className="navBar d-flex justify-content-around">
            <div className="m-auto">
              <Link className="link" to="/">
                <HomeSVG />
              </Link>
            </div>
            <div className="m-auto">
              <MiRestauranteLogo />
            </div>
            <div className="m-auto">
              <GoBackButton />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/camarero" element={<CamareroMenu />} />
          <Route path="/camarero/reservas" element={<CamareroReservas />} />
          <Route path="/camarero/carta" element={<CamareroCarta />} />
          <Route path="/camarero/pedido" element={<CamareroNewOrder />} />
          <Route path="/camarero/caja" element={<CamareroPayOrders />} />
          <Route
            path="/camarero/caja/:orderid"
            element={<CamareroDetailedOrder />}
          />

          <Route path="/manager" element={<Manager />} />
          <Route path="/manager/reservas" element={<ManagerReservas />} />
          <Route path="/manager/carta" element={<ManagerCarta />} />
          <Route path="/manager/pedido" element={<ManagerNewOrder />} />
          <Route path="/manager/caja" element={<ManagerPayOrders />} />
          <Route
            path="/manager/caja/:orderid"
            element={<ManagerDetailedOrder />}
          />

          <Route path="/boss" element={<Boss />} />
          <Route path="/boss/income" element={<IncomeData />} />
          <Route path="/boss/employees" element={<ManageEmployees />} />
          <Route path="/boss/mycompany" element={<MyCompanyData />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
