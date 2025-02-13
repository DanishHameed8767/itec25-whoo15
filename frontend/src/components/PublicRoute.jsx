// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
