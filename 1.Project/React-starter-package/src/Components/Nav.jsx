import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-4">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold z-10">
            <NavLink to="/">LearnIt</NavLink>
          </h1>

          {/* Hamburger Menu */}
          <button
            className="md:hidden z-10 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks setIsMenuOpen={setIsMenuOpen} />
            <ThemeSwitch />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            fixed inset-0 bg-gray-100/95 dark:bg-gray-900/95 md:hidden
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-lg">
            <NavLinks setIsMenuOpen={setIsMenuOpen} />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Separate component for navigation links
const NavLinks = ({ setIsMenuOpen }) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "/read", text: "Card" },
    { to: "/progress", text: "Progress" },
    { to: "/quiz", text: "Quiz" },
  ];

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );
};

export default Nav;