/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
// import houseData from '../../database/staticDatabase/houseData';
import { useQuery } from '@apollo/client';
import { GET_MYHOUSE_DATAS } from '../../database/queries/MyHouseQueries';

const Overview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedMenu] = useState('overview');
  const {data,loading,error} = useQuery(GET_MYHOUSE_DATAS)
  const houseData = data.getMyHouses;

  const overviewData = houseData.reduce(
    (acc, house) => {
      acc[house.location] = (acc[house.location] || 0) + 1;
      if (house.status === 'rented') acc.rented += 1;
      if (house.status === 'pending') acc.pending += 1;
      if (house.status === 'unRented') acc.unRented += 1;
      return acc;
    },
    { rented: 0, pending: 0, unRented: 0 }
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
              <div>
                <h1 className='font-bold py-2'>Houses by Status</h1>
            <div className='bg-white p-8 flex flex-col gap-4'>

            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Rented Houses</h3>
                <p>{overviewData.rented}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Pending Houses</h3>
                <p>{overviewData.pending}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">UnRented Houses</h3>
                <p>{overviewData.unRented}</p>
              </div>
            </div>
            </div>
            <div>
            <h1 className='font-bold py-2'>Houses by Location</h1>
            <div className='bg-white p-8 flex flex-col gap-4'>
              {Object.keys(overviewData).map(
                (location) =>
                  location !== 'rented' &&
                  location !== 'pending' &&
                  location !== 'unRented' && (
                    <div key={location} className="p-4 bg-white rounded-lg shadow-md">
                      <h3 className="text-xl font-bold">{location}</h3>
                      <p>{overviewData[location]}</p>
                    </div>
                  )
              )}
              </div>
            </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Overview;
