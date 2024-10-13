# Social Media Image Uploader Dashboard

This project is a full-stack application for handling user submissions, where users can submit their names, social media handles, and multiple profile photos. The submissions are then displayed on an admin dashboard, allowing administrators to view, delete, and manage the submissions.

## Features

### User Features:
- **Submit Form**: Users can submit their full name, social media handle, and upload multiple images.
- **Responsive Design**: The form is responsive and adjusts to different screen sizes.
- **Multiple Image Upload**: Users can upload multiple profile photos at once.
  
### Admin Features:
- **Admin Dashboard**: Admins can view a list of all users who submitted their details.
- **Image Preview**: All uploaded images are displayed with an option to preview them in full size.
- **Delete Functionality**: Admins can delete user submissions.
- **Logout Functionality**: Admins can securely log out of the dashboard.

### Authentication:
- **Admin Login**: Admins must log in to access the dashboard and manage user submissions.
- **Protected Routes**: Admin routes are protected and require authentication.

### Real-time Updates:
- **Dynamic List Update**: The list of users is updated dynamically as users submit their data or when the admin deletes a submission.

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool for development.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive layouts.
- **React Router**: For managing routing in the application.
- **Axios**: A promise-based HTTP client for making API requests to the backend.

### Backend:
- **Node.js**: A JavaScript runtime for the backend server.
- **Express.js**: A minimal web framework for creating API routes and handling server-side logic.
- **Multer**: Middleware for handling file uploads in Node.js.
- **MongoDB**: A NoSQL database for storing user information and images.
- **Cloudinary**: Used for uploading and storing images.
MONGODB_URI=<Your MongoDB URI> CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name> CLOUDINARY_API_KEY=<Your Cloudinary API Key> CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>

bash
Copy code

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/yourusername/social-media-image-uploader.git
Navigate to the project folder:

 
cd social-media-image-uploader
Install frontend dependencies:

 
cd client
npm install
Install backend dependencies:

 
cd ../server
npm install
