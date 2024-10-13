import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = { email, password };
      try {
        const response = await axios.post(
          "https://socialmedia-handler-backend.onrender.com/api/v1/login",
          formData
        );
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
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
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h2 className="text-3xl font-bold text-center mb-4">Welcome back!</h2>
          <p className="text-lg text-center mb-6">Please enter your details</p>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 bottom-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 bottom-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="flex justify-end text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white font-semibold rounded-md transition-colors hover:bg-white hover:text-black hover:border-black border-2 border-black"
            >
              Log In
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
