/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import houseData from '../database/staticDatabase/houseData';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
    style={{ zIndex: 1 }}
  >
    <FaArrowLeft className="text-white" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
    style={{ zIndex: 1 }}
  >
    <FaArrowRight className="text-white" />
  </button>
);

const HouseCards = () => {
  const [cardsToShow, setCardsToShow] = useState(3);
  const navigate = useNavigate();

  const updateCardsToShow = () => {
    if (window.innerWidth >= 1024) {
      setCardsToShow(3); // Large screens
    } else if (window.innerWidth >= 768) {
      setCardsToShow(2); // Medium screens
    } else {
      setCardsToShow(1); // Small screens
    }
  };

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => {
      window.removeEventListener('resize', updateCardsToShow);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cardsToShow,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleViewMore = (id) => {
    navigate(`/house/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100">
      <h2 className="text-3xl mb-6 text-gray-800">Available Houses</h2>
      <div className="relative w-full max-w-6xl">
        <Slider {...settings}>
          {houseData.map((house) => (
            <div
              key={house.id}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer mx-2"
            >
              <img
                src={house.image}
                alt={house.location}
                className="mb-4 w-full h-56 object-cover rounded-md"
              />
              <h2 className="mb-2 text-xl font-bold">{house.location}</h2>
              <p className="mb-2">Price: ${house.price}</p>
              <p className="mb-2">Size: {house.size} sq ft</p>
              {/* <p className="mb-2">{house.description}</p> */}
              <button
                onClick={() => handleViewMore(house.id)}
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
              >
                View More
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HouseCards;

// import { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import houseData from "../database/staticDatabase/houseData";

// const PrevArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute left-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
//     style={{ zIndex: 1 }}
//   >
//     <FaArrowLeft className="text-white" />
//   </button>
// );

// const NextArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute right-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
//     style={{ zIndex: 1 }}
//   >
//     <FaArrowRight className="text-white" />
//   </button>
// );

// const HouseCards = () => {
//   const [cardsToShow, setCardsToShow] = useState(3);

//   const updateCardsToShow = () => {
//     if (window.innerWidth >= 1024) {
//       setCardsToShow(3); // Large screens
//     } else if (window.innerWidth >= 768) {
//       setCardsToShow(2); // Medium screens
//     } else {
//       setCardsToShow(1); // Small screens
//     }
//   };

//   useEffect(() => {
//     updateCardsToShow();
//     window.addEventListener("resize", updateCardsToShow);
//     return () => {
//       window.removeEventListener("resize", updateCardsToShow);
//     };
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToScroll: 3,
//     slidesToShow: cardsToShow,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col items-center py-8 bg-gray-100">
//       <h2 className="text-3xl mb-6 text-gray-800">Available Houses</h2>
//       <div className="relative w-full max-w-6xl ">
//         <Slider {...settings}>
//           {houseData.map((house) => (
//             <div
//               key={house.id}
//               className="p-4 bg-white rounded-lg shadow-md cursor-pointer ml-6"
//             >
//               <img
//                 src={house.image}
//                 alt={house.location}
//                 className="mb-4 w-full h-48 object-cover rounded-md"
//               />
//               <h2 className="mb-2 text-xl font-bold">{house.location}</h2>
//               <p className="mb-2">Price: ${house.price}</p>
//               <p className="mb-2">Size: {house.size} sq ft</p>
//               <p className="mb-2">{house.description}</p>
//               <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
//                 View More
//               </button>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default HouseCards;
