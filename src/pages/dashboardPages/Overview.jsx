import { useEffect, useState } from "react";
import houseData from "../../database/staticDatabase/houseData";

const Overview = () => {
  const [houseCounts, setHouseCounts] = useState({});

  useEffect(() => {
    const counts = houseData.reduce((acc, house) => {
      acc[house.location] = (acc[house.location] || 0) + 1;
      return acc;
    }, {});
    setHouseCounts(counts);
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Object.entries(houseCounts).map(([location, count], index) => (
          <div key={index} className="p-4 bg-gray-50 border rounded-md">
            <h3 className="text-lg font-semibold">{location}</h3>
            <p>{count} Houses</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
