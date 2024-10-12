// models/ImageUploader.js
const mongoose = require("mongoose");

const imageUploaderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  profilePhotos: {
    type: [String], // Store Cloudinary URLs
    default: [],
  },
});

const ImageUploader = mongoose.model("ImageUploader", imageUploaderSchema);

module.exports = ImageUploader;
