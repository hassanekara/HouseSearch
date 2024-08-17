/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ADD_MYHOUSE_DATA,
  GET_ONE_OF_MYHOUSE_DATA,
} from "../../database/queries/MyHouseQueries";

const AddNewHouse = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  
  const [addMyHouse] = useMutation(ADD_MYHOUSE_DATA, {
    refetchQueries: [{ query: GET_ONE_OF_MYHOUSE_DATA }],
  });

  const resetMyHouseData = () => {
    setLocation("");
    setDescription("");
    setPrice(0);
    setSize(0);
    setNumberOfBeds(0);
  };

  const initialMyHouseData = {
    location: "",
    size: 0,
    price: 0,
    numberOfBeds: 0,
    image: "",
    status:"unRented",
    images_url: "",
    image_cover: "",
    description: "",
  };

  const packFiles = (files) => {
    const data = new FormData();
    [...files].forEach((file) => {
      data.append(`file_name`, file);
    });
    return data;
  };

  const saveCoverImageToCloudinary = async (coverImage) => {
    try {
      const resultOfOneImage= await axios.post(
        `http://localhost:2000/multiple_images-upload`,
        coverImage
      );
      console.log("This is a result of One Image from Claudinary", resultOfOneImage.data)
      return resultOfOneImage.data;
    } catch (error) {
      console.error("There was an Error of Saving Image to cloudinary:", error);
      return null;
    }
  };
  const saveImagesToCloudinary = async (formData) => {
    try {
      const result = await axios.post(
        `http://localhost:2000/multiple_images-upload`,
        formData
      );
      return result.data;
    } catch (error) {
      console.error("There was an Error of Saving Image to cloudinary:", error);
      return null;
    }
  };

  const onSubmit = async (values) => {
    console.log("You clicked on submit button");
    console.log("I want to catch values:", values);

    const formDataCoverImage = packFiles(values.CoverImage);
    const formData = packFiles(values.arrayOfImages);
    const savedCoverImage = await saveCoverImageToCloudinary(formDataCoverImage);
    const savedImagesData = await saveImagesToCloudinary(formData);

    if (!savedImagesData || !savedCoverImage) {
      alert("Error saving images to Cloudinary");
      return;
    }

    console.log(
      "After Saving savedCoverImage Images to Cloudinary:",
      savedCoverImage
    );
    console.log("After Saving Images to Cloudinary:", savedImagesData);

    addMyHouse({
      variables: {
        location: values.location,
        description: values.description,
        price: parseInt(values.price),
        size: parseInt(values.size),
        status:"unRented",
        numberOfBeds: parseInt(values.numberOfBeds),
        images_url: savedImagesData,
        image_cover: savedCoverImage,
      },
    })
      .then(() => {
        alert("Data saved to database successfully.");
        resetMyHouseData();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving data to database.");
      });
  };

  const validate = Yup.object({
    location: Yup.string().required("Location is required"),
    size: Yup.number().required("Size is required"),
    price: Yup.number().required("Price is required"),
    numberOfBeds: Yup.number().required("Number of beds is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: initialMyHouseData,
    onSubmit: onSubmit,
    validationSchema: validate,
  });

  return (
    <div className="flex flex-col md:flex-row items-center py-8 bg-gray-100">
      <div className="w-full px-4">
        <h2 className="text-3xl mb-4 text-gray-800">Add New House</h2>
        <form
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          role="form"
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <select
              id="location"
              name="location"
              data-testid="location"
              role="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Location</option>
              <option value="Kicukiro">Kicukiro</option>
              <option value="Gasabo">Gasabo</option>
              <option value="Nyarugenge">Nyarugenge</option>
            </select>
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500">{formik.errors.location}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              role="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="block text-gray-700">
              Size
            </label>
            <input
              type="number"
              id="size"
              name="size"
              role="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.size && formik.errors.size ? (
              <div className="text-red-500">{formik.errors.size}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfBeds" className="block text-gray-700">
              Number of Beds
            </label>
            <input
              type="number"
              id="numberOfBeds"
              name="numberOfBeds"
              role="numberOfBeds"
              value={formik.values.numberOfBeds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.numberOfBeds && formik.errors.numberOfBeds ? (
              <div className="text-red-500">{formik.errors.numberOfBeds}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              role="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="CoverImage" className="block text-gray-700">
              Select Cover Image
            </label>
            <input
              type="file"
              id="CoverImage"
              name="CoverImage"
              role="CoverImage"
              onChange={(event) =>
                formik.setFieldValue("CoverImage", event.target.files)
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              multiple
            />
          </div>
          <div className="mb-4">
            <label htmlFor="arrayOfImages" className="block text-gray-700">
              Select Description Images
            </label>
            <input
              type="file"
              id="arrayOfImages"
              name="arrayOfImages"
              role="arrayOfImages"
              onChange={(event) =>
                formik.setFieldValue("arrayOfImages", event.target.files)
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              multiple
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewHouse;
