import { Link, useParams } from "react-router-dom";
import houseData from "../database/staticDatabase/houseData";

const HouseDetails = () => {
  const { id } = useParams();
  const house = houseData.find((h) => h.id === parseInt(id));
  console.log(id);

  if (!house) {
    return <div>House not found</div>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img
          src={house.image}
          alt={house.location}
          className="mb-4 w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-2xl font-bold mb-4">{house.location}</h2>
        <p className="text-xl mb-2">Price: ${house.price}</p>
        <p className="text-xl mb-2">Size: {house.size} sq ft</p>
        <p className="mb-4">{house.description}</p>
        <Link to={"/houses"}>
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HouseDetails;
