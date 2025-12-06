
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  
    return <Navigate to="/auth"  />;
  

  return children;
}
