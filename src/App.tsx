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
import { ProtectedRoute } from "./components/main/protectedRoute";
import { LogInOutButton } from "./components/main/loginButton";
import { NotFound } from "./components/main/notFound";

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
            <div className="m-auto d-flex">
              <LogInOutButton />
              <GoBackButton />
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/camarero"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camarero/reservas"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroReservas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/camarero/carta"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroCarta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camarero/pedido"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroNewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camarero/caja"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroPayOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camarero/caja/:orderid"
            element={
              <ProtectedRoute role={["Waiter", "Manager", "Owner"]}>
                <CamareroDetailedOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <Manager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/reservas"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <ManagerReservas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/carta"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <ManagerCarta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/pedido"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <ManagerNewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/caja"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <ManagerPayOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/caja/:orderid"
            element={
              <ProtectedRoute role={["Manager", "Owner"]}>
                <ManagerDetailedOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/boss"
            element={
              <ProtectedRoute role={["Owner"]}>
                <Boss />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boss/income"
            element={
              <ProtectedRoute role={["Owner"]}>
                <IncomeData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boss/employees"
            element={
              <ProtectedRoute role={["Owner"]}>
                <ManageEmployees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boss/mycompany"
            element={
              <ProtectedRoute role={["Owner"]}>
                <MyCompanyData />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
