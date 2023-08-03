import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddItem from "../Pages/DashBoard/AdItem/AddItem";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import ManageItems from "../Pages/DashBoard/ManageItems/ManageItems";
import MyCart from "../Pages/DashBoard/MyCart/MyCart";
import UpdateItem from "../Pages/DashBoard/UpdateItem/UpdateItem";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Register from "../Pages/SignUp/Register";
import Secret from "../Shared/Secrect/Secret";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Payment from './../Pages/DashBoard/Payment/Payment';
import UserHome from "../Pages/DashBoard/UserHome/UserHome";
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoutes>
            <Secret></Secret>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      {
        path: "userhome",
        element: <UserHome></UserHome>,
      },
      {
        path: "mycart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      //admin routes 
      {
        path:'adminhome',
        element:<AdminRoutes><AdminHome></AdminHome></AdminRoutes>
      },
      {
        path: "allusers",
        element: <AdminRoutes><AllUsers/></AdminRoutes>,
      },
      {
        path: "addItem",
        element: <AdminRoutes><AddItem/></AdminRoutes>,
      },
      {
        path: "manageItems",
        element: <AdminRoutes><ManageItems/></AdminRoutes>,
      },
      {
        path: "updateItems/:id",
        element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
        loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
       
      },
    ],
  },
]);

export default router;
