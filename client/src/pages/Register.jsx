import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (
      name.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (password === confirmPassword) {
        const formData = {
          username: name + " " + lastname,
          email,
          password,
        };
        try {
          const response = await axios.post(
            "https://socialmedia-handler-backend.onrender.com/api/v1/register",
            formData
          );
          toast.success("Registration successful");
          navigate("/login");
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex h-screen">
     
      <div className="flex-grow flex flex-col justify-center items-center bg-white p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome!</h2>
        <p className="text-lg mb-8 text-center">Please enter your details</p>
        <form className="w-full max-w-md" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Lastname"
            name="lastname"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            )}
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
