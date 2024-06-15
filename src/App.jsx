import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import FilteredHouses from "./pages/filteredHouses/FilteredHouses";
import HouseDetails from "./pages/HouseDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/houses" element={<FilteredHouses />} />
        <Route path="/house/:id" element={<HouseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
