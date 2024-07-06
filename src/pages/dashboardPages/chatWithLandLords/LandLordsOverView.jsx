import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandLordsOverview = () => {
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    // Fetch landlords data from localStorage or an API
    const storedLandlords = JSON.parse(localStorage.getItem("landlords")) || [];
    setLandlords(storedLandlords);
  }, []);
  const navigate = useNavigate();

  const letsChart =()=>{
    navigate("/admin/chat")
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Landlords</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {landlords.map((landlord, index) => (
            <tr key={index}>
              <td className="p-4 border-b">{landlord.fullName}</td>
              <td className="p-4 border-b">{landlord.email}</td>
              <td className="p-4 border-b">
                <button
                onClick={letsChart}
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandLordsOverview;
