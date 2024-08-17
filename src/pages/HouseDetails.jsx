import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SecondNavigation from "../components/SecondNavigation";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REQUEST_MORE_INFO_DATA, GET_ALL_OF_REQUESTED_DATA, GET_ONE_OF_MYHOUSE_DATA } from "../database/queries/MoreHouseDedailsQueries";

const HouseDetails = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();

  const [createUserRequest] = useMutation(ADD_REQUEST_MORE_INFO_DATA, {
    refetchQueries: [{ query: GET_ALL_OF_REQUESTED_DATA }],
  });

  const { loading, error, data } = useQuery(GET_ONE_OF_MYHOUSE_DATA, {
    variables: { getMyHouseId: params.id },
  });

  const initialMyHouseData = {
    fullName: "",
    email: "",
    telephone: "",
    message:
      "I Choose this house can you give me more details and other  details",
  };
  
  const onSubmit = async (values) => {
    console.log("You clicked on submit button");
    console.log("I want to catch values:", values);
    console.log("The house ID is:", params.id);
   
    createUserRequest({
      variables: {
        fullName: values.fullName,
        email: values.email,
        message: values.message,
        telephone: values.telephone,
        house_id:[params.id]
      },
    })
      .then(() => {
        alert("Data saved to database successfully.");
    
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving data to database.");
      });
  };

  const validate = Yup.object({
    fullName: Yup.string().required("fullName is required"),
    email: Yup.string().required("email is required"),
    telephone: Yup.number().required("Telephone Number is required"),
  });

  const formik = useFormik({
    initialValues: initialMyHouseData,
    onSubmit: onSubmit,
    validationSchema: validate,
  });

  useEffect(() => {
    if (data && data.getMyHouse && data.getMyHouse.images_url.length > 0) {
      setSelectedImage(data.getMyHouse.images_url[0].url);
    }
  }, [data]);

  if (loading) {
    return <p>Data is Loading...</p>;
  }

  if (error) {
    return <p>Error loading house details</p>;
  }

  const house = data?.getMyHouse;

  if (!house) {
    return <div>House not found</div>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
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
      <SecondNavigation />

      <div className="p-4 md:p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="mb-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Main"
                className="w-full h-96 object-cover rounded-md"
              />
            )}
          </div>
          <div className="mb-4">
            <Slider {...thumbSliderSettings}>
              {house.images_url.map((image, index) => (
                <div key={index} onClick={() => handleImageClick(image.url)}>
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-20 object-cover rounded-md cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <h2 className="text-2xl font-bold mb-4">{house.location}</h2>
          <p className="text-xl mb-2">Price: Rwf {house.price}</p>
          <p className="text-xl mb-2">fullName: {house.fullName} sq ft</p>
          <p className="text-xl mb-2">
            Number of Beds: {house.numberOfBeds} Beds
          </p>
          <p className="mb-4">{house.description}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 mb-4"
          >
            Back
          </button>
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            role="form"
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700">
                fullName
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                role="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Full Name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-red-500">{formik.errors.fullName}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                role="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Email"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-gray-700">
                Telephone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                role="telephone"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Telephone Number"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.telephone && formik.errors.telephone ? (
                <div className="text-red-500">{formik.errors.telephone}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">
                message
              </label>
              <textarea
                name="message"
                role="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your message"
                rows="4"
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-500">{formik.errors.message}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          {/* <form
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
              <label className="block mb-2">Telephone</label>
              <input
                type="number"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Your Telephone Number"
              />
              {errors.telephone && (
                <span className="text-red-500">{errors.telephone}</span>
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
          </form> */}
        </div>
      </div>
    </div>
  );
};

const PrevArrow = () => (
  <button
    className="absolute left-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
    style={{ zIndex: 1 }}
  >
    <FaArrowLeft className="text-white" />
  </button>
);

const NextArrow = () => (
  <button
    className="absolute right-0 z-10 p-2 transform -translate-y-1/2 bg-blue-500 rounded-full top-1/2 hover:bg-blue-700"
    style={{ zIndex: 1 }}
  >
    <FaArrowRight className="text-white" />
  </button>
);

export default HouseDetails;
