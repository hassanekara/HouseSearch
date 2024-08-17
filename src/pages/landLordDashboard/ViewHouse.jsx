// ViewHouse.js
import { useParams } from "react-router-dom";
import houseData from "../../database/staticDatabase/houseData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button1 from "../../components/Button1";

const ViewHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const houseToView = houseData.find((h) => h.id === parseInt(id));
    if (houseToView) {
      setHouse(houseToView);
    }
  }, [id]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">House Details</h2>
      <div className="space-y-4">
        <div>
          <strong>Location:</strong> {house.location}
        </div>
        <div>
          <strong>Price:</strong> ${house.price}
        </div>
        <div>
          <strong>Size (sqft):</strong> {house.size}
        </div>
        <div>
          <strong>Description:</strong> {house.description}
        </div>
        <div>
          <strong>Status:</strong> {house.status}
        </div>
        <div>
          <strong>Images:</strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {house.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`House Image ${index + 1}`}
                className="w-full h-40 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <Link to="/landlord/houses">
          <Button1 title={"Back to Houses"} />
        </Link>
      </div>
    </div>
  );
};

export default ViewHouse;
