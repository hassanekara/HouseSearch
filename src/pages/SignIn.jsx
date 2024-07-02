/* eslint-disable no-undef */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      if (email === "mhthodol@gmail.com" && password === "123456") {
      // if (
      //   email === process.env.REACT_SECRETE_EMAIL &&
      //   password === process.env.REACT_SECRETE_PASSWORD
      // ) {
        navigate("/admin/overview");
      } else {
        alert("Invalid credentials!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:flex-row">
      <div className="w-full sm:w-1/2">
        <img
          src="/Images/AboutImage.png"
          alt="Sign In"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full p-6 sm:w-1/2">
        <Link to={"/"}>
          <button
            type="submit"
            className="px-4 my-6 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back
          </button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            {" "}
            This is Admin Portal
          </h2>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
