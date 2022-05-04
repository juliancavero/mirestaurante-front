import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { Camarero } from './components/waiterView/camarero';
import { Manager } from './components/managerView/manager';
import { Boss } from './components/bossView/boss';
import { Reservas } from './components/waiterView/reservations/reservas';
import { Carta } from './components/waiterView/carta/carta';
import { NewOrder } from './components/waiterView/orders/newOrder';
import { PayOrders } from './components/waiterView/payOrders/payOrders';
import { DetailedOrder } from './components/waiterView/payOrders/detailedOrder';
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
        <Route path='/camarero' element={<Camarero />}/>
        <Route path='/camarero/reservas' element={<Reservas />} />
        <Route path='/camarero/carta' element={<Carta />} />
        <Route path='/camarero/pedido' element={<NewOrder />} />
        <Route path='/camarero/caja' element={<PayOrders />} />
        <Route path='/camarero/caja/:orderid' element={<DetailedOrder />} />
        <Route path='/manager' element={<Manager />}/>
        <Route path='/boss' element={<Boss />}/>
        <Route path='/' element={<HomeMenu />}/>
      </Routes>

      </div>
   </Router>
  );
}


export default App;
