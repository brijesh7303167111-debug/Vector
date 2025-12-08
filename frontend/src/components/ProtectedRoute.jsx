import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
console.log(token);
console.log("protectedpage");
  // if (!token) {
    // Not logged in → redirect
    return(
      
      <>
      <Navigate to="/auth" replace />
      </>
      );
  // }

  // Logged in → allow access
  // return children;
}
