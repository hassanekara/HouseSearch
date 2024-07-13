import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Overview from './Overview';
import Houses from './Houses';
import Submissions from './Submissions';
import RentedHouses from './RentedHouses';
import UnRentedHouses from './UnRentedHouses';
import PendingHouses from './PendingHouses';
import AddNewHouse from './AddNewHouse';
import EditHouse from './EditHouse';
import ViewHouse from './ViewHouse';
import LandLordsOverview from './chatWithLandLords/LandLordsOverView';
import ChatWindow from './chatWithLandLords/ChartWindow';
import ContactUs from './ContactUs';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="houses" element={<Houses />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="rented" element={<RentedHouses />} />
        <Route path="unrented" element={<UnRentedHouses />} />
        <Route path="pending" element={<PendingHouses />} />
        <Route path="add-new-house" element={<AddNewHouse />} />
        <Route path="chart-with-landlord" element={<LandLordsOverview />} />
        <Route path="chat" element={< ChatWindow/>} />
        <Route path="view-house/:id" element={<ViewHouse />} />
        <Route path="edit-house/:id" element={<EditHouse />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="overview" />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
