import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubmitForm = () => {
  const [name, setName] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous message

    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("socialMediaHandle", socialMedia);

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("profilePhotos", file); // Ensure field name matches backend multer setup
      });
    }

    try {
      const response = await axios.post(
        "https://socialmedia-handler-backend.onrender.com/user/add", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("User information submitted successfully!");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to submit the form. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full w-full mx-auto bg-white shadow-md rounded-md p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-center">User Submission Form</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="social-media" className="block text-sm font-medium text-gray-700">
            Social Media Handle:
          </label>
          <input
            id="social-media"
            type="text"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            placeholder="Social media handle URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images:
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="images"
              type="file"
              multiple
              name="profilePhotos"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              className="w-32 px-4 py-2 border border-gray-300 text-sm text-gray-700 bg-white hover:bg-gray-50 rounded-md"
              onClick={() => document.getElementById("images").click()}
            >
              Choose Files
            </button>
            <span className="text-sm text-gray-500">
              {selectedFiles
                ? `${selectedFiles.length} file(s) selected`
                : "No file chosen"}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <p className="text-center mt-4">
          <Link className="text-blue-600 hover:underline" to="/login">
            Admin login
          </Link>
        </p>
        {message && (
          <div
            className={`mt-4 p-2 rounded-md ${
              message.includes("Error")
                ? "bg-red-200 text-red-700"
                : "bg-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubmitForm;
