import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaGamepad } from "react-icons/fa";
import logo from "/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg rounded-lg mb-4 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} className="h-25 w-30 rounded-full border-4 border-white" alt="Logo" />
          <span className="text-2xl font-bold text-white">Projecto Juegos</span>
        </div>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                isActive ? "bg-white text-indigo-600" : "text-white hover:bg-indigo-500"
              }`
            }
          >
            <FaHome className="mr-2" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/Games"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                isActive ? "bg-white text-indigo-600" : "text-white hover:bg-indigo-500"
              }`
            }
          >
            <FaGamepad className="mr-2" />
            <span>VideoJuegos</span>
          </NavLink>

          <NavLink
            to="/publisher"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                isActive ? "bg-white text-indigo-600" : "text-white hover:bg-indigo-500"
              }`
            }
          >
            <FaGamepad className="mr-2" />
            <span>Publisher</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
