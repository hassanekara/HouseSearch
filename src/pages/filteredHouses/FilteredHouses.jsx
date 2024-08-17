// /* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import Filter from "../../components/Filter";
// import Navigation from "../../components/Navigation";
// import houseData from "../../database/staticDatabase/houseData";
// import { useNavigate } from 'react-router-dom';
// import SecondNavigation from "../../components/SecondNavigation";
// const FilteredHouses = () => {
//   const [houses, setHouses] = useState(houseData);

//   const [filteredHouses, setFilteredHouses] = useState(houses);

//   const handleFilter = (filters) => {
//     const { location, priceRange, selectedLocation } = filters;
//     const [minPrice, maxPrice] = priceRange;

//     const filtered = houses.filter((house) => {
//       const matchesLocation =
//         !location ||
//         house.location.toLowerCase().includes(location.toLowerCase());
//       const matchesPrice = house.price >= minPrice && house.price <= maxPrice;
//       const matchesSelectedLocation =
//         !selectedLocation || house.location === selectedLocation;

//       return matchesLocation && matchesPrice && matchesSelectedLocation;
//     });

//     setFilteredHouses(filtered);
//   };

//   const handleCardClick = (house) => {
//     alert(
//       `House details:\nLocation: ${house.location}\nPrice: Rwf ${house.price}\nSize: ${house.size} sq ft\nDescription: ${house.description}`
//     );
//   };
//   const navigate = useNavigate();
//   const handleViewMore = (id) => {
//     navigate(`/house/${id}`);
//   };

//   return (
//     <div>
//       <nav>
//       <SecondNavigation />
//       </nav>
//       <div className="min-h-screen p-8 bg-gray-100">
//         <div className="mb-8">
//           <Filter onFilter={handleFilter} />
//         </div>
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredHouses.map((house) => (
//             <div
//               key={house.id}
//               className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
//               onClick={() => handleCardClick(house)}
//             >
//               <img
//                 src={house.image}
//                 alt={house.location}
//                 className="mb-4 rounded-md h-56 w-full"


//               />
//               <h2 className="mb-2 text-xl font-bold">{house.location}</h2>
//               <p className="mb-2">Price: Rwf {house.price} </p>
//               <p className="mb-2">Size: {house.size} sq ft</p>
//               <p className="mb-2" >Number of beds: {house.numberOfBeds} Bed</p>
//               {/* <p className="mb-2">{house.description}</p> */}
//               <button
//                 onClick={() => handleViewMore(house.id)}
//                 className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
//               >
//                 View More
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilteredHouses;
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import Navigation from "../../components/Navigation";
// import houseData from "../../database/staticDatabase/houseData";
import { useNavigate } from 'react-router-dom';
import SecondNavigation from "../../components/SecondNavigation";
import { useQuery } from "@apollo/client";
import { GET_MYHOUSE_DATAS } from "../../database/queries/MyHouseQueries";
const FilteredHouses = () => {
  // const [houses, setHouses] = useState("");
  const [filteredHouses, setFilteredHouses] = useState([]);
  const navigate = useNavigate();
 
  const {loading,error,data} = useQuery(GET_MYHOUSE_DATAS);
  useEffect(() => {
    if (data && data.getMyHouses) {
      setFilteredHouses(data.getMyHouses);
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading houses</p>;




  const handleFilter = (filters) => {
    const { location, priceRange, selectedLocation } = filters;
    const [minPrice, maxPrice] = priceRange;
  
    console.log('Filters:', filters); // Check received filters
    console.log('Data:', data.getMyHouses); // Check fetched data
  
    const filtered = data.getMyHouses.filter((house) => {
      const matchesLocation = !location || house.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice = house.price >= minPrice && house.price <= maxPrice;
      const matchesSelectedLocation = !selectedLocation || house.location === selectedLocation;
  
      return matchesLocation && matchesPrice && matchesSelectedLocation;
    });
  
    console.log('Filtered Houses:', filtered); // Check filtered results
    setFilteredHouses(filtered);
  };
  const handleViewMore = (id) => {
    navigate(`/house/${id}`);
  };

  return (
    <div>
      <nav>
      <SecondNavigation />
      </nav>
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="mb-8">
          <Filter onFilter={handleFilter} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHouses.map((house) => (
          // {houseData.map((house) => (
            <div
              key={house.id}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer mx-2"
            >
             {house.image_cover.map((image)=>(
              <div key={image.url}>
                 <img
                src={image.url}
                alt={image.url}
                className="mb-4 w-full h-56 object-cover rounded-md"
              />
              </div>
             ))}
              <h2 className="mb-2 text-xl font-bold">{house.location}</h2>
              <p className="mb-2">Price: ${house.price}</p>
              <p className="mb-2">Size: {house.size} sq ft</p>
              {/* <p className="mb-2">{house.description}</p> */}
              <button
                onClick={() => handleViewMore(house._id)}
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
