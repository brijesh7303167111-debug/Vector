// src/components/layout/Navbar.jsx
import React, { useEffect, useMemo, useState, Suspense } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./components/Logo";
import MagicLoader from "../../Lightwind/MagicLoader";
import Loadernav from "../../Lightwind/Loadernav";

// breakpoint helpers
const isDesktopQuery = "(min-width: 1024px)"; // lg and up
const isTabletQuery = "(min-width: 768px) and (max-width: 1023.98px)"; // md

function useBreakpoint() {
  // 'desktop' | 'tablet' | 'mobile'
  const get = () => {
    if (typeof window === "undefined") return "desktop";
    if (window.matchMedia(isDesktopQuery).matches) return "desktop";
    if (window.matchMedia(isTabletQuery).matches) return "tablet";
    return "mobile";
  };

  const [bp, setBp] = useState(get);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const desktopMq = window.matchMedia(isDesktopQuery);
    const tabletMq = window.matchMedia("(min-width: 768px)");

    const handler = () => {
      if (desktopMq.matches) setBp("desktop");
      else if (tabletMq.matches) setBp("tablet");
      else setBp("mobile");
    };

    // attach listeners
    try {
      desktopMq.addEventListener?.("change", handler);
      tabletMq.addEventListener?.("change", handler);
    } catch {
      // Safari fallback
      desktopMq.addListener?.(handler);
      tabletMq.addListener?.(handler);
    }

    // ensure initial state is correct
    handler();

    return () => {
      try {
        desktopMq.removeEventListener?.("change", handler);
        tabletMq.removeEventListener?.("change", handler);
      } catch {
        desktopMq.removeListener?.(handler);
        tabletMq.removeListener?.(handler);
      }
    };
  }, []);

  return bp;
}

export default React.memo(function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const bp = useBreakpoint();

  // Lazy-load only the nav component required for this breakpoint.
  // We memoize the Lazy component so React doesn't recreate it on every render.
  const NavComponent = useMemo(() => {
    if (bp === "desktop") {
      return React.lazy(() => import("./components/Desktopnav"));
    }
    if (bp === "tablet") {
      return React.lazy(() => import("./components/Tabletnav"));
    }
    // mobile
    return React.lazy(() => import("./components/Mobilenav"));
  }, [bp]);

  // props passed to nav components: desktop wants onOpenProfile, mobile wants open/setOpen
  const navProps =
    bp === "desktop"
      ? { onOpenProfile: () => setProfileOpen((s) => !s) }
      : bp === "tablet"
      ? {}
      : { open: mobileOpen, setOpen: setMobileOpen };

  return (
    <header className="w-full bg-[#0F172A] border-b border-[#111827]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo compact={false} />
        </div>

        {/* Render the correct nav inside Suspense; fallback is minimal loader */}
        <Suspense fallback={<div className="w-48 flex justify-center"><Loadernav/></div>}>
          <NavComponent {...navProps} />
        </Suspense>

        {/* keep a small area for mobile hamburger (if mobile) or profile on desktop is inside Desktopnav */}
        <div className="hidden md:block items-center gap-2">
         </div>
      </div>

      {/* Profile dropdown (simple) */}
      {profileOpen && (
        <div className="absolute right-6 top-16 z-50 w-56 bg-[#111827] border border-white/5 rounded shadow py-2">
          <NavLink
            to="/myprofile"
            className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
            onClick={() => setProfileOpen(false)}
          >
            View profile
          </NavLink>

          <NavLink
            to="/settings"
            className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
            onClick={() => setProfileOpen(false)}
          >
            Settings
          </NavLink>

          <button
            type="button"
            className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
            onClick={() => {
              setProfileOpen(false);
              // TODO: call logout handler here, e.g. logout()
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
});
