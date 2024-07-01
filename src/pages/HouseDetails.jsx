/* eslint-disable react/prop-types */

import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import houseData from "../database/staticDatabase/houseData";
import Navigation from "../components/Navigation";

const HouseDetails = () => {
  const { id } = useParams();
  const house = houseData.find((h) => h.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(house.images[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  if (!house) {
    return <div>House not found</div>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
      submissions.push({ ...form, houseId: id, date: new Date() });
      localStorage.setItem("submissions", JSON.stringify(submissions));
      setForm({ name: "", email: "", message: "" });
      alert("Form submitted successfully");
    }
  };

  const thumbSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <Navigation />

      <div className="p-4 md:p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Main"
              className="w-full h-96 object-cover rounded-md"
            />
          </div>
          <div className="mb-4">
            <Slider {...thumbSliderSettings}>
              {house.images.map((image, index) => (
                <div key={index} onClick={() => handleImageClick(image)}>
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-20 object-cover rounded-md cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <h2 className="text-2xl font-bold mb-4">{house.location}</h2>
          <p className="text-xl mb-2">Price: ${house.price}</p>
          <p className="text-xl mb-2">Size: {house.size} sq ft</p>
          <p className="text-xl mb-2">Number of Beds: {house.numberOfBeds} Beds</p>
          <p className="mb-4">{house.description}</p>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">More Details</h3>
            <p>{house.details}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 mb-4"
          >
            Back
          </button>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your full name"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your message"
                rows="4"
              />
              {errors.message && (
                <span className="text-red-500">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

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

export default HouseDetails;
