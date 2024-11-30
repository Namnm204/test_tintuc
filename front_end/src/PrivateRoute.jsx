import { Navigate } from "react-router-dom";

// Function to retrieve user from localStorage
const getUser = () => {
  const user = localStorage.getItem("user") || {};
  try {
    return user ? JSON.parse(user) : null; // Try parsing, return null if not found or invalid
  } catch (error) {
    console.error("Error parsing user from localStorage:", error); // Optional: Log the error
    return null; // Return null if parsing fails
  }
};

const PrivateRoute = ({ children }) => {
  const user = getUser();
  const isAdmin = user && user.role === "admin"; // Check if the user is an admin

  if (!isAdmin) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (!isAdmin) {
    return <div>Bạn đéo có quyền vào trang này</div>; // Custom message for non-admin users
  }

  return children; // Return the protected content if authenticated and an admin
};

export default PrivateRoute;
