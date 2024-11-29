import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/auth" />
};

export default PrivateRoute;
