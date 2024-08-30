import React from "react";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Menu({ onClose }) {
  const { isLoggedin } = useSelector((state) => state.user);
  return (
    <div className="fixed bg-gray-800 flex flex-col z-30 inset-0">
      {/* Added 'inset-0' to ensure full-screen coverage */}
      <div className="flex justify-between items-center p-5 border-b border-gray-700">
        <h1 className="text-gray-100 text-3xl font-semibold">
          <span className="text-orange-600">B</span>log
          <span className="text-orange-600">S</span>phere
        </h1>
        <div className="flex items-center gap-10">
          {isLoggedin && (
            <li className="list-none text-white text-2xl transition-all duration-300 ease-in-out hover:text-blue-600">
              <Link
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500"
                    : "hover:text-blue-500 transition-colors duration-300"
                }
                aria-label="Profile"
              >
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
          )}
          <i
            onClick={onClose}
            className="fa-solid fa-circle-xmark text-red-500 text-2xl cursor-pointer"
          ></i>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <NavLinks isNavbar={false} />
      </div>
    </div>
  );
}

export default Menu;
