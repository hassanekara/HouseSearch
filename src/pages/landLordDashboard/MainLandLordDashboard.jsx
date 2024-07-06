
import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "./Overview";
import Houses from "./Houses";
import AddNewHouse from "./AddNewHouse";
import ViewHouse from "./ViewHouse";
import EditHouse from "./EditHouse";
import ChatWindow from "./ChartWindow";
import LandLordLayout from "./LandLordLayout";

const MainLandLordDashboard = () => {
  return (
    <LandLordLayout>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="houses" element={<Houses />} />
        <Route path="chart-window" element={<ChatWindow />} />
        <Route path="add-new-house" element={<AddNewHouse />} />
        <Route path="view-house/:id" element={<ViewHouse />} />
        <Route path="edit-house/:id" element={<EditHouse />} />
        <Route path="*" element={<Navigate to="overview" />} />
      </Routes>
    </LandLordLayout>
  );
};

export default MainLandLordDashboard;

