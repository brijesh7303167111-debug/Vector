// src/components/layout/DesktopNav.jsx
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

export default function Desktopnav({ onOpenProfile }) {
  return (
    <nav className="hidden  lg:flex justify-between items-center gap-8">
      <ul className="flex items-center gap-6">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-md transition-colors ${isActive ? "text-teal-400" : "text-slate-300 hover:text-teal-300"}`
              }
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right side: profile */}
      <div className="ml-6 absolute right-8 ">
        <button onClick={onOpenProfile} className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5">
          <img src="/avatar-placeholder.png" alt="avatar" className="h-9 w-9 rounded-full object-cover border-2 border-white" />
        </button>
      </div>
    </nav>
  );
}
