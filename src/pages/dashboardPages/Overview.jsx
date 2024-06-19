/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import houseData from '../../database/staticDatabase/houseData';

const Overview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('overview');

  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(storedSubmissions);
  }, []);

  const overviewData = houseData.reduce(
    (acc, house) => {
      acc[house.location] = (acc[house.location] || 0) + 1;
      if (house.status === 'rented') acc.rented += 1;
      if (house.status === 'pending') acc.pending += 1;
      if (house.status === 'unrented') acc.unrented += 1;
      return acc;
    },
    { rented: 0, pending: 0, unrented: 0 }
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-4 md:p-8 bg-gray-100 overflow-y-auto">
        {selectedMenu === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Total Houses</h3>
                <p>{houseData.length}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Rented Houses</h3>
                <p>{overviewData.rented}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Pending Houses</h3>
                <p>{overviewData.pending}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Unrented Houses</h3>
                <p>{overviewData.unrented}</p>
              </div>
              {Object.keys(overviewData).map(
                (location) =>
                  location !== 'rented' &&
                  location !== 'pending' &&
                  location !== 'unrented' && (
                    <div key={location} className="p-4 bg-white rounded-lg shadow-md">
                      <h3 className="text-xl font-bold">{location}</h3>
                      <p>{overviewData[location]}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Overview;
