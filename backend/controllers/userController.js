// controllers/userController.js
const ImageUploader = require("../models/ImageUploader");
const cloudinary = require("../config/cloudinary");

const addImageUploader = async (req, res) => {
  const { fullName, socialMediaHandle } = req.body;

  try {
    // Upload files to Cloudinary
    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, { folder: "profile_photos" })
    );
    
    const results = await Promise.all(uploadPromises);
    const profilePhotos = results.map(result => result.secure_url);

    const newImageUploader = new ImageUploader({ fullName, socialMediaHandle, profilePhotos });
    await newImageUploader.save();
    
    res.status(201).json({ message: "Image uploader added successfully!", data: newImageUploader });
  } catch (error) {
    console.error("Error saving image uploader:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteImageUploader = async (req, res) => {
  const { id } = req.params;

  try {
    const uploader = await ImageUploader.findById(id);
    if (!uploader) {
      return res.status(404).json({ success: false, message: "Image uploader not found" });
    }

    // Optionally delete images from Cloudinary if needed
    const deletePromises = uploader.profilePhotos.map(photoUrl => {
      const publicId = photoUrl.split('/').pop().split('.')[0]; // Extract the publicId from the Cloudinary URL
      return cloudinary.uploader.destroy(publicId);
    });
    await Promise.all(deletePromises);

    // Delete the uploader document from the database
    await ImageUploader.findByIdAndDelete(id);
    
    res.status(200).json({ success: true, message: "Image uploader deleted successfully" });
  } catch (error) {
    console.error("Error deleting image uploader:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// New function to get all image uploaders
const getAllImageUploaders = async (req, res) => {
  try {
    const imageUploaders = await ImageUploader.find(); // Fetch all image uploaders
    res.status(200).json({ success: true, data: imageUploaders });
  } catch (error) {
    console.error("Error fetching image uploaders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addImageUploader,
  getAllImageUploaders, 
  deleteImageUploader,  
};
