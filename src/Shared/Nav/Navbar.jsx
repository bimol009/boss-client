import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isDarkTheme, setIsDarkTheme } = useAuth();
  const { user, logOutEmail } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const location = useLocation();

  const handleLogOut = () => {
    logOutEmail()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/menu">Menu</Link>
      </li>

      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        {isAdmin ? (
          <Link to="/dashboard/adminhome">Dashboard</Link>
        ) : (
          <Link to="/dashboard/userhome">Dashboard</Link>
        )}
      </li>
      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      <li>
        <button className="btn gap-2">
          <FaShoppingCart className="text-2xl"></FaShoppingCart>
          <Link to="/dashboard/mycart" className="badge badge-secondary">
            {cart?.length} || 0
          </Link>
        </button>
      </li>
      {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            Log Out
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-ghost">
            <Link to="/login">Login</Link>
          </button>
        </>
      )}
    </>
  );

  return (
    <div
      className={`${
        isDarkTheme
          ? "dark-theme"
          : location.pathname === "/"
          ? "white-theme"
          : "white-theme"
      }`}
    >
      <div className="navbar fixed z-10 bg-opacity-30 text-white max-w-screen-xl bg-black ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div>
          {
            location.pathname === '/' &&(
              <button onClick={()=>{
                setIsDarkTheme(theme=>!theme)
              }}>

                {
                  isDarkTheme?'dark':'light'
                }

              </button>
            )
          }
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
