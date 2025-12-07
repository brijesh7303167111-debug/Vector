// src/components/layout/icons.js
import React from "react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessageCircle,
  Bell,
  CalendarDays,
  Search
} from "lucide-react";

export const HomeIcon = ({ className = "h-6 w-6" }) => (
  < Home className={className} strokeWidth={1.7} />
);

export const NetworkIcon = ({ className = "h-6 w-6" }) => (
  <Users className={className} strokeWidth={1.7} />
);

export const JobsIcon = ({ className = "h-6 w-6" }) => (
  <BriefcaseBusiness className={className} strokeWidth={1.7} />
);

export const MessageIcon = ({ className = "h-6 w-6" }) => (
  <MessageCircle className={className} strokeWidth={1.7} />
);

export const BellIcon = ({ className = "h-6 w-6" }) => (
  <Bell className={className} strokeWidth={1.7} />
);

export const EventsIcon = ({ className = "h-6 w-6" }) => (
  <CalendarDays className={className} strokeWidth={1.7} />
);

export const FindIcon = ({ className = "h-6 w-6" }) => (
  <Search className={className} strokeWidth={1.7} />
);
