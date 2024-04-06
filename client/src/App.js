import { Routes,Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoutes';


function App() {
  return (
    < >
    {" "}
    <ToastContainer/>
      <Routes>
        
        <Route path='/' element={
          <PublicRoute>
        <Homepage/>
        </PublicRoute>
        }/>
        <Route path='/Login' element={
        <PublicRoute>
        <Login/>
        </PublicRoute>}/>
        <Route path='/Register' element={
          <PublicRoute>
        <Register/>
        </PublicRoute>}/>
        <Route path='/Dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }/>
        <Route path='*' element={<Notfound/>}/>
         </Routes>
    
    </>
  );
}

export default App;
