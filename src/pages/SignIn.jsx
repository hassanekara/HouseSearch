// // SignIn.js
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_SIGN_IN_MUTATION } from "../database/queries/Users";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [signIn, { loading }] = useMutation(USER_SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn.token);
      localStorage.setItem("user_Id", data.signIn.userId);
      navigate("/landlord/overview");
    },
    onError: (error) => {
      console.error(error);
      setErrors({ form: error.message });
    },
  });
  // const myToken = localStorage.getItem('token');
  // const myUserId = localStorage.getItem("user_Id");
  // console.log("Login Data of user are----", myToken , myUserId)

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    const validationErrors = validateForm();
    e.preventDefault();
      if (
      email === "hassanekaranouradine@gmail.com" &&
        password === "12345hk"
    ) {
       navigate("/admin/houses");
   }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      signIn({
        variables: {
          email,
          password,
        },
      });
    }
  };

  console.log("you are welcome")
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
            type="button"
            className="px-4 my-6 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back
          </button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">Get Logged In</h2>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
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
            disabled={loading}
          >
            Sign In
          </button>
          {errors.form && (
            <p className="mt-4 text-xs text-red-500">{errors.form}</p>
          )}
          <div className="py-2">
            <p>
              Is this your first time?{" "}
              <Link to={"/sign-up"}>
                <span className="text-blue-500">Create an Account</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
