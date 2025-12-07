// src/components/layout/MobileNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, NetworkIcon, JobsIcon, MessageIcon, BellIcon, EventsIcon, FindIcon } from "./icons";

const ITEMS = [
  { to: "/", label: "Home", Icon: HomeIcon },
  { to: "/network", label: "My Network", Icon: NetworkIcon },
  { to: "/jobs", label: "Jobs", Icon: JobsIcon },
  { to: "/messaging", label: "Messaging", Icon: MessageIcon },
  { to: "/notifications", label: "Notifications", Icon: BellIcon },
  { to: "/events", label: "Events", Icon: EventsIcon },
  { to: "/find-mates", label: "Find Teammates", Icon: FindIcon },
];
import logoSrc from "../../../assets/vector2.png";

export default function Mobilenav({ open, setOpen }) {
  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="md:hidden p-2 rounded-md hover:bg-white/5"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6 text-slate-300" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>

      <div className={`fixed inset-0 z-50 transform transition-transform md:hidden ${open ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <aside className="absolute right-0 top-0 h-full w-72 bg-[#222831] p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img src={logoSrc} alt="Vector" className="h-10 w-10 object-contain" />
              <div className="text-white text-xl font-semibold">Vector</div>
            </NavLink>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md bg-white/10">✕</button>
          </div>

          <nav className="flex flex-col gap-2">
            {ITEMS.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? "bg-white/5 text-teal-300" : "text-slate-200 hover:bg-white/3"}`
                }
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 border-t border-white/5 pt-4">
            <NavLink to="/auth/login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-slate-200">Sign in</NavLink>
            <NavLink to="/auth/signup" onClick={() => setOpen(false)} className="block mt-2 px-3 py-2 rounded-md bg-teal-500 text-white text-center">Create account</NavLink>
          </div>
        </aside>
      </div>
    </>
  );
}
