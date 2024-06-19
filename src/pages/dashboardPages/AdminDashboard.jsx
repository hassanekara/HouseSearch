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

// import  { useEffect, useState } from 'react';
// import { FaBell, FaUserCircle } from 'react-icons/fa';
// import houseData from '../../database/staticDatabase/houseData';

// const AdminDashboard = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState('overview');

//   useEffect(() => {
//     const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
//     setSubmissions(storedSubmissions);
//   }, []);

//   const overviewData = houseData.reduce(
//     (acc, house) => {
//       acc[house.location] = (acc[house.location] || 0) + 1;
//       if (house.status === 'rented') acc.rented += 1;
//       if (house.status === 'pending') acc.pending += 1;
//       if (house.status === 'unrented') acc.unrented += 1;
//       return acc;
//     },
//     { rented: 0, pending: 0, unrented: 0 }
//   );

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md">
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//           <ul>
//             <li
//               className={`mb-2 p-2 rounded cursor-pointer ${
//                 selectedMenu === 'overview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
//               }`}
//               onClick={() => setSelectedMenu('overview')}
//             >
//               Overview
//             </li>
//             <li
//               className={`mb-2 p-2 rounded cursor-pointer ${
//                 selectedMenu === 'submissions' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
//               }`}
//               onClick={() => setSelectedMenu('submissions')}
//             >
//               Submissions
//             </li>
//           </ul>
//         </div>
//       </aside>
//       <main className="flex-1 p-4 md:p-8 bg-gray-100 overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center space-x-4">
//             <FaBell className="text-2xl" />
//             <div className="relative">
//               <FaUserCircle className="text-4xl" />
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400"></span>
//             </div>
//           </div>
//         </div>
//         {selectedMenu === 'overview' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Overview</h2>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold">Total Houses</h3>
//                 <p>{houseData.length}</p>
//               </div>
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold">Rented Houses</h3>
//                 <p>{overviewData.rented}</p>
//               </div>
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold">Pending Houses</h3>
//                 <p>{overviewData.pending}</p>
//               </div>
//               <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold">Unrented Houses</h3>
//                 <p>{overviewData.unrented}</p>
//               </div>
//               {Object.keys(overviewData).map(
//                 (location) =>
//                   location !== 'rented' &&
//                   location !== 'pending' &&
//                   location !== 'unrented' && (
//                     <div key={location} className="p-4 bg-white rounded-lg shadow-md">
//                       <h3 className="text-xl font-bold">{location}</h3>
//                       <p>{overviewData[location]}</p>
//                     </div>
//                   )
//               )}
//             </div>
//           </div>
//         )}
//         {selectedMenu === 'submissions' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Submissions</h2>
//             <ul>
//               {submissions.map((submission, index) => (
//                 <li key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
//                   <p>
//                     <strong>Name:</strong> {submission.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {submission.email}
//                   </p>
//                   <p>
//                     <strong>Message:</strong> {submission.message}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {new Date(submission.date).toLocaleString()}
//                   </p>
//                   <p>
//                     <strong>House ID:</strong> {submission.houseId}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

