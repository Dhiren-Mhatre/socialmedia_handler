import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [imageUploaders, setImageUploaders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchImageUploaders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user"); 
        if (response.data.success) {
          setImageUploaders(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch image uploader data.");
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
    navigate("/login"); 
  };

  const handleAddMoreUsers = () => {
    navigate("/"); 
  };

  const handleDeleteUploader = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this uploader?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      setImageUploaders((prev) => prev.filter((uploader) => uploader._id !== id)); // Update the state
    } catch (err) {
      console.error("Error deleting image uploader:", err);
      setError("Failed to delete the image uploader.");
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800"> Dashboard Panel</h1>

        {/* Logout and Add More Users Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={handleAddMoreUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add More Users
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-800 flex-1 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm"> </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Social Media</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Profile Photos</th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th> {/* Actions column */}
              </tr>
            </thead>
            <tbody className="text-orange-700 flex-1">
              {imageUploaders.map((uploader, index) => (
                <tr key={uploader._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-200">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{uploader.fullName}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <a
                      href={uploader.socialMediaHandle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {uploader.socialMediaHandle}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      {uploader.profilePhotos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo}
                          alt={uploader.fullName}
                          className="w-16 h-16 object-cover rounded-md border border-gray-300 cursor-pointer hover:shadow-lg"
                          onClick={() => window.open(photo, "_blank")} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteUploader(uploader._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {imageUploaders.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
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
