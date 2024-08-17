// SignUp.js
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ADD_USER_DATA, GET_ALL_USERS_DATAS } from "../database/queries/Users";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUp] = useMutation(ADD_USER_DATA, {
    refetchQueries: [{ query: GET_ALL_USERS_DATAS }],
  });

  const initialUser = {
    fullName: "",
    email: "",
    password: "",
    telephone: "",
    role: "Landrold",
  };

  const onSubmit = async (values) => {
    console.log("You clicked on submit button");
    console.log("I want to catch values:", values);

    signUp({
      variables: {
        fullName: values.fullName,
        email: values.email,
        telephone: values.telephone,
        password: values.password,
        role: "Landrold",
      },
    })
      .then(() => {
        alert("Data saved to database successfully.");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving data to database.");
      });
  };

  const validate = Yup.object({
    fullName: Yup.string().required("fullName is required"),
    telephone: Yup.string().required("telephone is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialUser,
    onSubmit: onSubmit,
    validationSchema: validate,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
      <div className="w-full sm:w-1/2">
        <img
          src="/Images/AboutImage.png"
          alt="Sign Up"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full p-6 sm:w-1/2">
        <Link to={"/"}>
          <button
            type="button"
            className="px-4 my-6 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back
          </button>
        </Link>

        <form
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          role="form"
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700">
              Your Full Name
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
              Your Email
            </label>
            <input
              type="text"
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
              Telephone Number
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              role="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your Telephone number"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className="text-red-500">{formik.errors.telephone}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              role="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
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

export default SignUp;
