import React from 'react';
import { NavLink } from 'react-router-dom';

export default React.memo(function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
      </nav>
    </header>
  );
});
