import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
console.log(user,"uaaaser")
  return user ? children : <Navigate to="/auth" />
};

export default PrivateRoute;
