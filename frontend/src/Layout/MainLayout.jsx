// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";



export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="">
        <Outlet />
      </main>

      <Footer />

     
    </div>
  );
}
