import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBars,
  FaBook,
  FaUser,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
// import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
// import useUser from "../hooks/useUser";

const Dashboard = () => {
  // const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  // const [isUser] = useUser();

  return (
    <div className="drawer lg:drawer-mobile ">
      <Helmet>
        <title>Academy of dance | Dashboard </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-base-content bg-[#D1A054]">
          
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome /> ADMIN HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem">
                  <FaUtensils /> ADD ITEMS
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaBars /> MANAGE ITEMS
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaBook /> MANAGE BOOKINGS
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUser /> ALL USERS
                </NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
            {/* Default menu items */}
            <li>
              <NavLink to="/dashboard/userhome">
                <FaHome /> User Instructor
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservation">
                <FaCalendarAlt /> Reservation
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/history">
                <FaWallet /> Payment History
              </NavLink>
            </li>
            <li>
              {/* <NavLink to="/dashboard/mycart">
                <FaShoppingCart /> My Cart
                <span className="badge badge-secondary">
                  {cart?.length} || 0
                </span>
              </NavLink> */}
            </li>
          </>
         
          ) : (
            <>
            
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                {/* <NavLink to="/dashboard/mycart">
                  <FaShoppingCart /> My Cart
                  <span className="badge badge-secondary">
                    {cart?.length} || 0
                  </span>
                </NavLink> */}
              </li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/secret">Secret</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">Order</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
