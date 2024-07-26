
// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_HOUSE_MUTATION, GET_ALL_HOUSES } from "../../database/queries/HouseQueries";
// import { useNavigate } from "react-router-dom";
// import Button1 from "../../components/Button1";

// const AddHouse = () => {
//   const [location, setLocation] = useState("");
//   const [status] = useState("unRented");
//   const [price, setPrice] = useState(0);
//   const [size, setSize] = useState(0);
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [link, setLink] = useState("");
//   const [numberOfBeds, setNumberOfBeds] = useState(0);
//   const navigate = useNavigate();

//   const [addHouse] = useMutation(ADD_HOUSE_MUTATION, {
//     refetchQueries: [{ query: GET_ALL_HOUSES }],
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addHouse({ variables: { location, status, price, size, description, image, link, numberOfBeds } });
//     navigate("/admin/houses");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 md:p-8 bg-gray-100">
//       <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Add New House</h2>
//         <div className="mb-4">
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
//         <div className="mb-4">
//           <label className="block text-gray-700">Status</label>
//           <input
//             type="text"
//             value={status}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Price</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(parseFloat(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Size (sq ft)</label>
//           <input
//             type="number"
//             value={size}
//             onChange={(e) => setSize(parseFloat(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Image</label>
//           <input
//             type="text"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Link</label>
//           <input
//             type="text"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Number of Beds</label>
//           <input
//             type="number"
//             value={numberOfBeds}
//             onChange={(e) => setNumberOfBeds(parseInt(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <Button1 type="submit" title="Add House" />
//       </div>
//     </form>
//   );
// };

// export default AddHouse;


import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_HOUSE_MUTATION, GET_ALL_HOUSES } from "../../database/queries/HouseQueries";
import Button1 from "../../components/Button1";
import { useNavigate } from "react-router-dom";

const AddNewHouse = () => {
  const [location, setLocation] = useState("Kicukiro");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  const [status] = useState("unRented");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [addHouse, { loading, error }] = useMutation(ADD_HOUSE_MUTATION, {
    refetchQueries: [{ query: GET_ALL_HOUSES }],
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
//Handle Front end Images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
    //Try to store Image to the backend
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHouse({
      variables: {
        location,
        price: parseFloat(price),
        size: parseFloat(size),
        numberOfBeds: parseInt(numberOfBeds),
        status,
        description,
        images,
        link,
      },
    }).then(() => navigate("/admin/houses"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New House</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Size (sq ft)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Number of Beds</label>
            <input
              type="number"
              value={numberOfBeds}
              onChange={(e) => setNumberOfBeds(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`House ${index}`}
                  className="w-full h-32 object-cover"
                />
              ))}
            </div>
          </div>
          <Button1 title={"Add House"} icon={"+"} />
        </form>
      </div>
    </div>
  );
};

export default AddNewHouse;
