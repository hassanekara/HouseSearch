/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Filter from "../../components/Filter";
import Navigation from "../../components/Navigation";
import houseData from "../../database/staticDatabase/houseData";
import { useNavigate } from 'react-router-dom';
const FilteredHouses = () => {
  const [houses, setHouses] = useState(houseData);

  const [filteredHouses, setFilteredHouses] = useState(houses);

  const handleFilter = (filters) => {
    const { location, priceRange, selectedLocation } = filters;
    const [minPrice, maxPrice] = priceRange;

    const filtered = houses.filter((house) => {
      const matchesLocation =
        !location ||
        house.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice = house.price >= minPrice && house.price <= maxPrice;
      const matchesSelectedLocation =
        !selectedLocation || house.location === selectedLocation;

      return matchesLocation && matchesPrice && matchesSelectedLocation;
    });

    setFilteredHouses(filtered);
  };

  const handleCardClick = (house) => {
    alert(
      `House details:\nLocation: ${house.location}\nPrice: $${house.price}\nSize: ${house.size} sq ft\nDescription: ${house.description}`
    );
  };
  const navigate = useNavigate();
  const handleViewMore = (id) => {
    navigate(`/house/${id}`);
  };

  return (
    <div>
      <nav>
        <Navigation />
      </nav>
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="mb-8">
          <Filter onFilter={handleFilter} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHouses.map((house) => (
            <div
              key={house.id}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
              onClick={() => handleCardClick(house)}
            >
              <img
                src={house.image}
                alt={house.location}
                className="mb-4 rounded-md"
              />
              <h2 className="mb-2 text-xl font-bold">{house.location}</h2>
              <p className="mb-2">Price: ${house.price}</p>
              <p className="mb-2">Size: {house.size} sq ft</p>
              <p className="mb-2">{house.description}</p>
              <button
                onClick={() => handleViewMore(house.id)}
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredHouses;
