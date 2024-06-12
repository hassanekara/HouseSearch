import { useState } from "react";
import houseData from "../database/staticDatabase/houseData";

const HouseCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + cardsPerPage) % houseData.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - cardsPerPage + houseData.length) % houseData.length
    );
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100">
      <h2 className="text-3xl mb-6 text-gray-800">Available Houses</h2>
      <div className="relative w-full max-w-6xl overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
          }}
        >
          {houseData.map((house) => (
            <div key={house.id} className="w-full md:w-1/3 flex-shrink-0 px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={house.image}
                  alt={house.place}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{house.place}</h3>
                  <p className="text-gray-600">{house.price}</p>
                  <a
                    href={house.link}
                    className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          onClick={handlePrev}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HouseCards;
