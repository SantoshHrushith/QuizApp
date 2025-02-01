import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the sun and moon icons from react-icons
import './Navbar.css'; // Import CSS for the navbar

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">TestlineQuiz</div>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;