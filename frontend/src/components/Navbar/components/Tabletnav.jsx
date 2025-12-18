// src/components/layout/TabletNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, NetworkIcon, JobsIcon, MessageIcon, BellIcon, EventsIcon, FindIcon } from "./icons";

const ITEMS = [
  { to: "/", Icon: HomeIcon, alt: "Home" },
  { to: "/network", Icon: NetworkIcon, alt: "Network" },
  { to: "/jobs", Icon: JobsIcon, alt: "Jobs" },
  { to: "/messaging", Icon: MessageIcon, alt: "Messaging" },
  { to: "/notifications", Icon: BellIcon, alt: "Notifications" },
  { to: "/events", Icon: EventsIcon, alt: "Events" },
  { to: "/find-mates", Icon: FindIcon, alt: "Find Teammates" },
];

export default function Tabletnav({ onOpenProfile , }) {
  return (
    <>
    <nav className="hidden md:flex lg:hidden items-center gap-4">
      {ITEMS.map(({ to, Icon, alt }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `p-2 rounded-md ${isActive ? "text-teal400 bg-white/5" : "text-subtle hover:text-teal300 hover:bg-white/3"}`
          }
          title={alt}
        >
          <Icon className="h-6 w-6" />
        </NavLink>
      ))}

 <div className="ml-6 absolute right-8 ">
        <button onClick={onOpenProfile} className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5">
          <img src="/avatar-placeholder.png" alt="avatar" className="h-7 w-7 rounded-full object-cover border-2 border-white" />
        </button>
      </div>zz

    </nav>

    
      </>
  );
}
