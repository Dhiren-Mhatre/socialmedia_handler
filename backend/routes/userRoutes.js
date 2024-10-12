// routes/userRoutes.js
const express = require("express");
const multer = require("multer");
const { addImageUploader, getAllImageUploaders, deleteImageUploader } = require("../controllers/userController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// POST route to add a new image uploader
router.post("/user/add", upload.array("profilePhotos", 10), addImageUploader);

// GET route to fetch all image uploaders
router.get("/user", getAllImageUploaders);

// DELETE route to delete an image uploader by ID
router.delete("/user/:id", deleteImageUploader); // Route to delete image uploader by ID

module.exports = router;
