import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Assuming you have a CSS file for additional styling

// Validation schema
const schema = yup.object().shape({
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  numberOfBeds: yup
    .number()
    .required("Bed Room Number is Required")
    .positive("Bed Room Number can't be negative"),
  size: yup
    .number()
    .required("Size is required")
    .positive("Size must be positive"),
  description: yup.string().required("Description is required"),
  images: yup
    .mixed()
    .test(
      "required",
      "At least one image is required",
      (value) => value && value.length > 0
    )
    .test("fileSize", "Each file must be less than 5MB", (value) =>
      value ? Array.from(value).every((file) => file.size <= 5242880) : true
    )
    .test("fileType", "Only image files are allowed", (value) =>
      value
        ? Array.from(value).every((file) =>
            ["image/jpeg", "image/png", "image/gif"].includes(file.type)
          )
        : true
    ),
});

const AddNewHouse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
    // Convert images to an array of URLs or FormData for upload
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New House</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Location</label>
          <select
            {...register("location")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a location</option>
            <option value="Kicukiro">Kicukiro</option>
            <option value="Gasabo">Gasabo</option>
            <option value="Nyarugenge">Nyarugenge</option>
          </select>
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block text-gray-700">
            numberOfBeds
          </label>
          <input
            type="number"
            {...register("numberOfBeds")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.numberOfBeds && (
            <p className="text-red-500">{errors.numberOfBeds.message}</p>
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
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            {...register("images")}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
          />
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add House
        </button>
      </form>
    </div>
  );
};

export default AddNewHouse;
