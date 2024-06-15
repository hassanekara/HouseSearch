/* eslint-disable react/prop-types */
import { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriceChange = (e, type) => {
    if (type === 'min') setMinPrice(e.target.value);
    else setMaxPrice(e.target.value);
  };

  const handleRadioChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const applyFilters = () => {
    if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) {
      alert("Please enter valid min and max price.");
      return;
    }

    onFilter({
      location,
      priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
      selectedLocation,
    });
  };

  return (
    <div className="p-4 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={handleLocationChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex justify-between mb-4">
        <select
          value={minPrice}
          onChange={(e) => handlePriceChange(e, 'min')}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Min Price</option>
          <option value="1000">$1,000</option>
          <option value="2000">$2,000</option>
          <option value="3000">$3,000</option>
        </select>
        <select
          value={maxPrice}
          onChange={(e) => handlePriceChange(e, 'max')}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Max Price</option>
          <option value="5000">$5,000</option>
          <option value="10000">$10,000</option>
          <option value="15000">$15,000</option>
        </select>
      </div>
      <div className="mb-4">
        {['New York', 'Los Angeles', 'Chicago'].map((loc) => (
          <label key={loc} className="block mb-2">
            <input
              type="radio"
              name="location"
              value={loc}
              checked={selectedLocation === loc}
              onChange={handleRadioChange}
              className="mr-2"
            />
            {loc}
          </label>
        ))}
      </div>
      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
