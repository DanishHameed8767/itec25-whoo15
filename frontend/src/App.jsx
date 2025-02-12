import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Home';
import Login from './components/login';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import IngredientList from "./components/Inventory/InventoryList";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboard><Home /></Dashboard>} />
          <Route path="/inventory" element={<Dashboard><IngredientList /></Dashboard>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
