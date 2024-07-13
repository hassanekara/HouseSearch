/* eslint-disable no-unused-vars */
// SignIn.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      user {
        id
        fullName
        username
        telephone
      }
    }
  }
`;

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await signIn({
          variables: {
            username,
            password
          }
        });
        localStorage.setItem('token', response.data.signIn.token);
        navigate("/landlord/overview");
      } catch (err) {
        console.error(err);
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
          <h2 className="mb-6 text-2xl font-bold text-center">
            Get Logged In
          </h2>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
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
          {error && <p className="mt-4 text-xs text-red-500">{error.message}</p>}
          <div className="py-2">
            <p>
              Is this your first time?{" "}
              <Link to={"/sign-up"}>
                <span>Create an Account</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
