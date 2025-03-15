import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../assets/logo.png'; // Replace with your logo
import cart from '../assets/logo.png'; // Replace with your cart icon

const Navbar = () => {
  const [menu, setMenu] = useState('home');

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <p>Smart<span>Highway</span></p>
      </div>

      <ul className="navbar-menu">
        <li onClick={() => setMenu('home')}>
          <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          {menu === 'home' && <hr />}
        </li>
        <li onClick={() => setMenu('alerts')}>
          <Link to="/alerts" style={{ textDecoration: 'none' }}>Alerts</Link>
          {menu === 'alerts' && <hr />}
        </li>
        <li onClick={() => setMenu('report')}>
          <Link to="/report" style={{ textDecoration: 'none' }}>Report</Link>
          {menu === 'report' && <hr />}
        </li>
        <li onClick={() => setMenu('about')}>
          <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
          {menu === 'about' && <hr />}
        </li>
      </ul>

      <Link to="/login">
          <button>Login</button>
      </Link>
    </div>
  );
};

export default Navbar;