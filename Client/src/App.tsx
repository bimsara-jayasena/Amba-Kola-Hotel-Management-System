import React from 'react';
import logo from './logo.svg';
import './App.css';
import AdminDashboard from './Pages/Admin/Dashboard';
import Home from './Pages/Login/Home';
import RegisterAdmin from './Pages/CreateAdmin/RegisterAdmin';
import Test from './Pages/Login/Test';
import { Routes,Route } from 'react-router-dom';
import SuccessDialog from './Pages/CreateAdmin/SuccessDialog';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home  />}/>
          <Route path='/newAdmin' element={<RegisterAdmin/>}/>
          <Route path='/Dashboard' element={<AdminDashboard/>}/>
          
          
        </Routes>

    </div>
  );
}

export default App;
