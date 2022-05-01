import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { Camarero } from './components/camarero';
import { Manager } from './components/manager';
import { Boss } from './components/boss';
import { Reservas } from './components2/reservations/reservas';
import { Carta } from './components2/carta/carta';
import { NewOrder } from './components2/orders/newOrder';
import { PayOrders } from './components/payOrders/payOrders';
import { DetailedOrder } from './components/payOrders/detailedOrder';


function App() {

  return (
    <Router>
      <div>
        <nav>
          <div className="navBar">
            
              <Link className='link' to='/camarero'>Camarero</Link>
              <Link className='link' to='/manager'>Manager</Link>
              <Link className='link' to='/boss'>Boss</Link>
              <Link className='link' to='/'>Home</Link>
            
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
      </Routes>

      </div>
   </Router>
  );
}


export default App;
