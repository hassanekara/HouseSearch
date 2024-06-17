import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Overview from './Overview';
import Houses from './Houses';
import Submissions from './Submissions';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="houses" element={<Houses />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="*" element={<Navigate to="overview" />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
