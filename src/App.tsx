import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"; 
import { Camarero } from './components/camarero';
import { Manager } from './components/manager';
import { Boss } from './components/boss';
import { Reservas } from './components2/reservations/reservas';
import { Carta } from './components2/carta/carta';
import { NewOrder } from './components2/orders/newOrder';
import { PayOrders } from './components2/payOrders/payOrders';
import { DetailedOrder } from './components2/payOrders/detailedOrder';
import { HomeMenu } from './components2/main/homeMenu';
import { ReactComponent as HomeSVG } from './homeIcon.svg';
import { ReactComponent as MiRestauranteLogo } from './mirestaurantelogo.svg';
import { GoBackButton } from './components2/main/goBack';


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
