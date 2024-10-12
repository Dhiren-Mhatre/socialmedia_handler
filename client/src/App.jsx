import { RouterProvider, createBrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Logout, Register } from "./pages";
import { ToastContainer } from 'react-toastify';
import SubmitForm from "./pages/SubmitForm";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

const router = createBrowserRouter([
  {
    path: "/",
    element: <SubmitForm />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <ProtectedRoute element={<Dashboard />} />, // Use ProtectedRoute for Dashboard
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
