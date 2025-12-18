// src/features/home/HomePage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MagicLoader from "../../Lightwind/MagicLoader";
import api from "../../api/axios";

export default function HomePage() {
 

  return (
    <section className="space-y-6">
      <div className="rounded-lg bg-white shadow p-6">
        <h1 className="text-2xl font-semibold">Welcome to MyNetwork</h1>
        <p className="mt-2 text-sm text-gray-600">
          Discover jobs, connect with professionals, join hackathons, and build your network.
        </p>

        <div className="mt-4 flex gap-3">
          <Link to="/jobs" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Job Search</Link>
          <Link to="/messaging" className="inline-block px-4 py-2 border rounded">Open Chat</Link>
        </div>
      </div>

      
          
    </section>
  );
}
