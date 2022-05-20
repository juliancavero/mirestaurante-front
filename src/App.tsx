import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { Camarero as CamareroMenu } from './components/waiterView/camarero';
import { Manager } from './components/managerView/manager';
import { Boss } from './components/bossView/boss';
import { Reservas as CamareroReservas } from './components/waiterView/reservations/reservas';
import { Carta as CamareroCarta } from './components/waiterView/carta/carta';
import { NewOrder as CamareroNewOrder } from './components/waiterView/orders/newOrder';
import { PayOrders as CamareroPayOrders } from './components/waiterView/payOrders/payOrders';
import { DetailedOrder as CamareroDetailedOrder } from './components/waiterView/payOrders/detailedOrder';

import { Reservas as ManagerReservas } from './components/managerView/reservations/reservas';
import { Carta as ManagerCarta } from './components/managerView/carta/carta';
import { NewOrder as ManagerNewOrder } from './components/managerView/orders/newOrder';
import { PayOrders as ManagerPayOrders } from './components/managerView/payOrders/payOrders';
import { DetailedOrder as ManagerDetailedOrder } from './components/managerView/payOrders/detailedOrder';

import { HomeMenu } from './components/main/homeMenu';
import { ReactComponent as HomeSVG } from './homeIcon.svg';
import { ReactComponent as MiRestauranteLogo } from './mirestaurantelogo.svg';
import { GoBackButton } from './components/main/goBack';


function App() {

  return (
    <Router>
      <div>
        <nav>
          <div className="navBar d-flex justify-content-around">
            <div className='m-auto'><Link className='link' to='/'><HomeSVG /></Link></div>
            <div className='m-auto'><MiRestauranteLogo /></div>
            <div className='m-auto'><GoBackButton /></div>
          </div>
        </nav>

      <Routes>
        <Route path='/camarero' element={<CamareroMenu />}/>
          <Route path='/camarero/reservas' element={<CamareroReservas />} />
          <Route path='/camarero/carta' element={<CamareroCarta />} />
          <Route path='/camarero/pedido' element={<CamareroNewOrder />} />
          <Route path='/camarero/caja' element={<CamareroPayOrders />} />
          <Route path='/camarero/caja/:orderid' element={<CamareroDetailedOrder />} />

        <Route path='/manager' element={<Manager />}/>
          <Route path='/manager/reservas' element={<ManagerReservas />} />
          <Route path='/manager/carta' element={<ManagerCarta />} />
          <Route path='/manager/pedido' element={<ManagerNewOrder />} />
          <Route path='/manager/caja' element={<ManagerPayOrders />} />
          <Route path='/manager/caja/:orderid' element={<ManagerDetailedOrder />} />


        <Route path='/boss' element={<Boss />}/>
          <Route path='/boss/income' element={<ManagerReservas />} />
          <Route path='/boss/employees' element={<ManagerReservas />} />
          <Route path='/boss/mycompany' element={<ManagerReservas />} />
          <Route path='/boss/income' element={<ManagerPayOrders />} />


        <Route path='/' element={<HomeMenu />}/>
      </Routes>

      </div>
   </Router>
  );
}


export default App;
