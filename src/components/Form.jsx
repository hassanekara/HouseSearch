/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Form = ({ onFilter }) => {
  // const Filter = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocation] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriceChange = (e, type) => {
    if (type === "min") setMinPrice(e.target.value);
    else setMaxPrice(e.target.value);
  };

  const applyFilters = () => {
    if (!minPrice || !maxPrice) {
      alert("Please ");
      return;
    }

    onFilter({
      location,
      priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
      selectedLocation,
    });
  };
  return (
    <div
      className="relative h-[90vh] bg-contain bg-center hidden md:block"
      style={{ backgroundImage: "url('/Images/HomeBg.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-64 gap-8 ">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-4xl mb-6 text-white ">
            Find the House that suits your
          </h2>
          <h2 className="text-4xl mb-6 text-white ">
            Badgets and your lifestyle
          </h2>
        </div>
        <form className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg justify-center items-center  w-full flex gap-6">
          <div
            className=" flex gap-4 items-center"
          >
            <div className=" w-56">
              <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex justify-between gap-4"> 
              <select
                value={minPrice}
                onChange={(e) => handlePriceChange(e, "min")}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Min Price</option>
                <option value="10000">RWf 10,000</option>
                <option value="50000">RWf 50,000</option>
                <option value="80000">RWf 80,000</option>
                <option value="100000">RWf 100,000</option>
              </select>
              <select
                value={maxPrice}
                onChange={(e) => handlePriceChange(e, "max")}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Max Price</option>
                <option value="50000">RWf 50,000</option>
                <option value="80000">RWf 80,000</option>
                <option value="100000">RWf 100,000</option>
                <option value="150000">RWf 150,000</option>
              </select>
            </div>
            <Link to={"/houses"}>
              <button
                onClick={applyFilters}
                className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

/* eslint-disable react/prop-types */
// import { useState } from 'react';

// const Filter = ({ onFilter }) => {
//   const [location, setLocation] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handlePriceChange = (e, type) => {
//     if (type === 'min') setMinPrice(e.target.value);
//     else setMaxPrice(e.target.value);
//   };

//   const handleRadioChange = (e) => {
//     setSelectedLocation(e.target.value);
//   };

//   const applyFilters = () => {
//     if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice)) {
//       alert("Please enter valid min and max price.");
//       return;
//     }

//     onFilter({
//       location,
//       priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
//       selectedLocation,
//     });
//   };

//   return (
//     <div className="p-4 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by location"
//           value={location}
//           onChange={handleLocationChange}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//         />
//       </div>
//       <div className="flex justify-between mb-4">
//         <select
//           value={minPrice}
//           onChange={(e) => handlePriceChange(e, 'min')}
//           className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="">Min Price</option>
//           <option value="10000">RWf 10,000</option>
//           <option value="50000">RWf 50,000</option>
//           <option value="80000">RWf 80,000</option>
//           <option value="100000">RWf 100,000</option>
//         </select>
//         <select
//           value={maxPrice}
//           onChange={(e) => handlePriceChange(e, 'max')}
//           className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="">Max Price</option>
//           <option value="50000">RWf 50,000</option>
//           <option value="80000">RWf 80,000</option>
//           <option value="100000">RWf 100,000</option>
//           <option value="150000">RWf 150,000</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         {['Gasabo', 'Nyarugenge', 'Kicukiro'].map((loc) => (
//           <label key={loc} className="block mb-2">
//             <input
//               type="radio"
//               name="location"
//               value={loc}
//               checked={selectedLocation === loc}
//               onChange={handleRadioChange}
//               className="mr-2"
//             />
//             {loc}
//           </label>
//         ))}
//       </div>
//       <button
//         onClick={applyFilters}
//         className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
//       >
//         Apply Filters
//       </button>
//     </div>
//   );
// };

// export default Filter;
