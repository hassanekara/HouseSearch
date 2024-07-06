import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import FilteredHouses from "./pages/filteredHouses/FilteredHouses";
import HouseDetails from "./pages/HouseDetails";
import AdminDashboard from "./pages/dashboardPages/AdminDashboard";
import SignIn from './pages/SignIn';
import SignUp from "./pages/SingUp";
import MainLandLordDashboard from './pages/landLordDashboard/MainLandLordDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/houses" element={<FilteredHouses />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/landlord/*" element={<MainLandLordDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
