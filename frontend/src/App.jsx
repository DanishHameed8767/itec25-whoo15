import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import InventoryList from "./components/Inventory/InventoryList";
import IngredientList from './components/Ingredients/IngredientList';
import RecipesList from './components/recepies/RecipesList';
import PublicRoute from './components/PublicRoute';
import Protected from './components/Protected';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Protected><Dashboard><Home /></Dashboard></Protected>} />
          <Route path="/inventory" element={<Protected><Dashboard><InventoryList /></Dashboard></Protected>} />
          <Route path="/ingredients" element={<Protected><Dashboard><IngredientList /></Dashboard></Protected>} />
          <Route path="/recipes" element={<Protected><Dashboard><RecipesList /></Dashboard></Protected>} />

          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><SignUp /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
