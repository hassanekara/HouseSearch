// // import React from 'react'

// import { useState } from "react"
// import Button1 from "../../components/Button1";
// import { useMutation } from "@apollo/client";
// import { ADD_HOUSE_MUTATION, GET_ALL_HOUSES } from "../../database/queries/HouseQueries";
// import { useNavigate } from "react-router-dom";

// function AddNewHouse() {
//   const [location, setLocation]=useState("Kicukiro");
//   const [size, setSize]=useState(0);
//   const [description, setDescription]=useState("");
//   const [price, setPrice]=useState(0);
//   const [numberOfBeds, setNumberOfBeds]=useState(0);
//   // const [images_url,setImages_url]=useState({url:"",filename:""});

//   const [addHouse] = useMutation(ADD_HOUSE_MUTATION,{
//     refetchQueries:[{query:GET_ALL_HOUSES}]
//   })

//   const resetHouseContent =()=>{
//     setLocation("Kicukiro");
//     setSize(0);
//     setDescription("");
//     setNumberOfBeds(0);
//     setPrice(0);
//   }
// const navigate = useNavigate();

//   const handleSubmit = (e) =>{
//     e.preventDefault();//___ ___ ___ ___//\\
//     const houseDataToBeSaved ={
//       location:location,
//       size:parseInt(size),
//       price:parseInt(price),
//       numberOfBeds:parseInt(numberOfBeds),
//       description:description
//     }
//     addHouse({variables:{houseDataToBeSaved}});
//     alert("Do you want to save the House Data?")
//     console.log("My values to be Saved into the database: ",houseDataToBeSaved);

//     // console.log("The content of File are:",images_url);
//     resetHouseContent();
//     navigate("/admin/houses");
//   }
//   return (
//     <div>
//     <div className="p-4 md:p-8 bg-gray-100">
//       <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Add New House</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1">Location</label>
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="Kicukiro">Kicukiro</option>
//               <option value="Gasabo">Gasabo</option>
//               <option value="Nyarugenge">Nyarugenge</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Price</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Size (sq ft)</label>
//             <input
//               type="number"
//               value={size}
//               onChange={(e) => setSize(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Number of Beds</label>
//             <input
//               type="number"
//               // value={numberOfBeds}
//               value ={numberOfBeds}
//               onChange={(e) => setNumberOfBeds(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Description</label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Images</label>
//             <input
//               type="file"
//               multiple
//               // onChange={(e)=>setImages_url("arrayOfImage", e.currentTarget.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             {/* <div className="mt-4 grid grid-cols-3 gap-4">
//               {images_url.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`House ${index}`}
//                   className="w-full h-32 object-cover"
//                 />
//               ))}
//             </div> */}
//           </div>
//           <Button1 title={"Add House"} icon={"+"} />
//         </form>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default AddNewHouse

// function AddNewHouse() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default AddNewHouse

import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_MYHOUSE_DATA,
  GET_ONE_OF_MYHOUSE_DATA,
} from "../../database/queries/MyHouseQueries";
// import { ADD_CONTACT_US_CONTENT, GET_CONTACT_US_CONTENTS } from "../../database/queries/ContactUsQueries";

const AddNewHouse = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [addMyHouse] = useMutation(ADD_MYHOUSE_DATA, {
    refetchQueries: [{ query: GET_ONE_OF_MYHOUSE_DATA }],
  });

  const initialMyHouseData = () => {
    setLocation("");
    setDescription("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMyHouse({ variables: { location, description } });
    alert("Data saved to database is SuccessFully...");
    console.log("Contact Us Content Saved are:", addMyHouse);
    initialMyHouseData();
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-8 bg-gray-100">
      <div className="w-full px-4">
        <h2 className="text-3xl mb-4 text-gray-800">Add New House</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <div className="mb-4">
              <label className="block mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Kicukiro">Kicukiro</option>
                <option value="Gasabo">Gasabo</option>
                <option value="Nyarugenge">Nyarugenge</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send description
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewHouse;
