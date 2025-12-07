// src/components/layout/Logo.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../../../assets/vector2.png"; // ensure this path is correct

export default function Logo({ compact = false }) {
  return (
    <NavLink to="/" className="flex items-center gap-3">
      <img src={logoSrc} alt="Vector logo" className="h-10 w-10 object-contain" />
      {!compact && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-3xl font-semibold text-white">Vector</span>
         </div>
      )}
    </NavLink>
  );
}
