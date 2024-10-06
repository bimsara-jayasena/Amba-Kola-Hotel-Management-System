import React from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './Pages/Admin/Dashboard';
import Reception from './Pages/Reception/Dashboard';
import Home from './Pages/Login/Home';
import RegisterAdmin from './Pages/CreateAdmin/RegisterAdmin';
import Test from './Pages/Login/Test';
import { Routes,Route } from 'react-router-dom';
import SuccessDialog from './Pages/CreateAdmin/SuccessDialog';
import Cashier from './Pages/Cashier/Dashboard';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home  />}/>
          <Route path='/newAdmin' element={<RegisterAdmin/>}/>
          <Route path='/admin/Dashboard' element={<Admin/>}/>
          <Route path='/receptionist/Dashboard' element={<Reception/>}/>
          <Route path='/cashier/Dashboard' element={<Cashier/>}/>
        </Routes>

    </div>
  );
}

export default App;
