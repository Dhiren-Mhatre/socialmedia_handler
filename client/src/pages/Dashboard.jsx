import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the toggle button

const Dashboard = () => {
  const [imageUploaders, setImageUploaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // Reference for the sidebar

  useEffect(() => {
    const fetchImageUploaders = async () => {
      try {
        const response = await axios.get(
          "https://socialmedia-handler-backend.onrender.com/user"
        );
        if (response.data.success) {
          setImageUploaders(response.data.data);
        } else {
          setError(
            response.data.message || "Failed to fetch image uploader data."
          );
        }
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch image uploader data.";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchImageUploaders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/logout");
  };

  const handleAddMoreUsers = () => {
    navigate("/");
  };

  const handleDeleteUploader = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this uploader?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://socialmedia-handler-backend.onrender.com/user/${id}`
      );
      setImageUploaders((prev) =>
        prev.filter((uploader) => uploader._id !== id)
      );
    } catch (err) {
      console.error("Error deleting image uploader:", err);
      setError("Failed to delete the image uploader.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleClickOutside = (event) => {
    // Close the sidebar if the click is outside of it
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the sidebar
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        ref={sidebarRef} // Reference to the sidebar
        className={`fixed top-0 left-0 h-full bg-blue-800 text-white p-6 space-y-6 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">SocialMedia Handlers</h2>
          <button
            onClick={toggleSidebar}
            className="text-white p-3 focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <button
            className="text-lg font-medium focus:outline-none hover:bg-blue-700 rounded-lg px-4 py-2"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="text-lg font-medium focus:outline-none hover:bg-blue-700 rounded-lg px-4 py-2"
            onClick={() => navigate("/dashboard")}
          >
            Profile
          </button>
          <button
            className="text-lg font-medium focus:outline-none hover:bg-blue-700 rounded-lg px-4 py-2"
            onClick={() => navigate("/dashboard")}
          >
            Settings
          </button>
        </nav>
        <button
          onClick={handleAddMoreUsers}
          className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white py-2 rounded-lg mt-6"
        >
          Add More Users
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 ml-0 transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-md focus:outline-none"
          >
            <FaBars /> {/* Toggle icon */}
          </button>
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dguy5exjy/image/upload/v1728729836/profile_photos/ky9zexrmcqn14ndcb5gu.jpg"
              alt="User profile"
              className="w-10 h-10 rounded-full ml-4"
            />
            <span className="text-lg text-gray-600 p-4">Dhiren Mhatre</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-left">
            <thead className="bg-blue-800 text-white">
              <tr className="text-xs sm:text-sm">
                <th className="py-4 px-6 font-semibold text-lg">#</th> {/* Increased font size */}
                <th className="py-4 px-6 font-semibold text-lg">Full Name</th>
                <th className="py-4 px-6 font-semibold text-lg">Social Media</th>
                <th className="py-4 px-6 font-semibold text-lg">Profile Photos</th>
                <th className="py-4 px-6 font-semibold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-orange-700 text-xs sm:text-sm">
              {imageUploaders.map((uploader, index) => (
                <tr key={uploader._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-200 text-lg">{index + 1}</td> {/* Increased font size */}
                  <td className="py-3 px-4 border-b border-gray-200 text-lg">{uploader.fullName}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-lg">
                    <a
                      href={uploader.socialMediaHandle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {uploader.socialMediaHandle}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-lg">
                    <div className="flex flex-wrap gap-2">
                      {uploader.profilePhotos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo}
                          alt={uploader.fullName}
                          className="w-16 h-16 sm:w-24 sm:h-24 
                           object-cover rounded-md border border-gray-300 cursor-pointer hover:shadow-lg"
                          onClick={() => window.open(photo, "_blank")}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-lg">
                    <button
                      onClick={() => handleDeleteUploader(uploader._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {imageUploaders.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No image uploaders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
