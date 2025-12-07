// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MagicLoader from "./Lightwind/MagicLoader";
import NotFound from "./Lightwind/NotFound";
import AuthPage from "./Features/Auth/AuthPage";
import AuthLayout from "./Layout/AuthLayout";
import HomePage from "./Features/Home/Homepage";
import Jobpage from "./Features/Jobs/Jobpage";
import Chatpage from "./Features/Chat/Chatpage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfilePage from "./Features/Profile/MyProfilePage";
import MainLayout from "./Layout/MainLayout";


// color svheme 
//     -- https://colorhunt.co/palette/22283131363f76abaeeeeeee
//     -- https://colorhunt.co/palette/00546101879000b7b5f4f4f4
// #222831 — Charcoal Dark — Main background for entire app.
// #31363F — Slate Dark — Cards, panels, navbar, sidebar surfaces.
// #00B7B5 — Teal Primary — Primary buttons, CTAs, active links, highlights.
// #018790 — Deep Teal — Button hover, selected states, emphasis accents.
// #005461 — Teal Dark — Strong borders, active button state, section dividers.
// #76ABAE — Soft Muted Teal — Input focus, subtle highlights, secondary accents.
// #FFFFFF — Pure White — Headings, icons, primary text elements.


export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <MagicLoader size={240} particleCount={2} speed={1} hueRange={[120, 220]} />
            </div>
        }
      >
        <Routes>
        
        
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="jobs" element={<Jobpage />} />
            <Route path="chat" element={<Chatpage />} />

          
            <Route
              path="myprofile"
              element={
                <ProtectedRoute>
                  <MyProfilePage />
                </ProtectedRoute>
              }
            />

             <Route path="*" element={<NotFound />} />
      
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<AuthPage />} />
            
          </Route>

          {/* fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
