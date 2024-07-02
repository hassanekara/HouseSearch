// EditHouse.js
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import houseData from "../../database/staticDatabase/houseData";
import { useState, useEffect } from "react";

// Validation schema
const schema = yup.object().shape({
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  size: yup
    .number()
    .required("Size is required")
    .positive("Size must be positive"),
    numberOfBeds: yup
    .number()
    .required("Bed Room Number is Required")
    .positive("Bed Room Number can't be negative"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File is too large", (value) => {
      return value && value[0] && value[0].size <= 2000000; // 2MB
    }),
});

const EditHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const houseToEdit = houseData.find((h) => h.id === parseInt(id));
    if (houseToEdit) {
      setHouse(houseToEdit);
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (house) {
      setValue("location", house.location);
      setValue("price", house.price);
      setValue("size", house.size);
      setValue("numberOfBeds",house.numberOfBeds)
      setValue("description", house.description);
    }
  }, [house, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
    navigate("/admin/houses"); // Redirect after save
  };

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit House</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Location</label>
          <select
            {...register("location")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Kicukiro">Kicukiro</option>
            <option value="Nyarugenge">Nyarugenge</option>
            <option value="Gasabo">Gasabo</option>
          </select>
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Size (sqft)</label>
          <input
            type="number"
            {...register("size")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.size && <p className="text-red-500">{errors.size.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Bed Room</label>
          <input
            type="number"
            {...register("numberOfBeds")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.size && <p className="text-red-500">{errors.numberOfBeds.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditHouse;
