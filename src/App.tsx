import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Meals from "./components/Meals/Meals.tsx";
import MealDetails from "./components/MealDetails/MealDetails.tsx";
import SelectedMeals from "./components/SelectedMeals/SelectedMeals.tsx";

function App() {

    console.log(import.meta.env);
  return (
      <BrowserRouter>
          <div className="flex flex-col min-h-screen justify-between">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Meals />} />
                  <Route path="/meal/:id" element={<MealDetails />} />
                  <Route path="/selected" element={<SelectedMeals />} />
              </Routes>
              <Footer/>
          </div>
      </BrowserRouter>
  )
}

export default App
