import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/Slices/UserSlice";

function NavLinks({ isNavbar }) {
  const { isLoggedin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await dispatch(logoutUser());
    if (res?.payload?.success) {
      navigate('/login');
    }
  }

  return (
    <ul
      className={`${
        isNavbar ? "flex space-x-4" : "flex flex-col space-y-4"
      } font-medium text-white`}
    >
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-500"
              : "hover:text-blue-500 transition-colors duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive
              ? "text-red-500"
              : "hover:text-blue-500 transition-colors duration-300"
          }
        >
          Our blogs
        </NavLink>
      </li>
      {isLoggedin && (
        <li>
          <NavLink
            to="/create-blog"
            className={({ isActive }) =>
              isActive
                ? "text-red-500"
                : "hover:text-blue-500 transition-colors duration-300"
            }
          >
            Create blogs
          </NavLink>
        </li>
      )}

      {isLoggedin ? (
        <>
          <li 
            onClick={handleLogout}
            className={`${isNavbar ? "ml-auto" : ""} cursor-pointer`}
          >
            <span className="hover:text-green-500 transition-colors duration-300">
              Logout
            </span>
          </li>
          {isNavbar && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500"
                    : "hover:text-blue-500 transition-colors duration-300"
                }
                aria-label="Profile"
              >
                <i className="fa-solid fa-user"></i>
              </NavLink>
            </li>
          )}
        </>
      ) : (
        <>
          <li className={isNavbar ? "ml-auto" : ""}>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500"
                  : "hover:text-green-500 transition-colors duration-300"
              }
            >
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500"
                  : "hover:text-green-500 transition-colors duration-300"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavLinks;
