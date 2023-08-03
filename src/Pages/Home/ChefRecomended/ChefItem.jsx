import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const ChefItem = ({ item }) => {
  const { name, recipe, image, price, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const { isDarkTheme, setIsDarkTheme } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const orderItem = {
        menuItemId: _id,
        name,
        image,
        price,
        recipe,
        email: user.email,
      };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              title: "Added on the Classes",
              text: "Modal with a custom image.",
              imageUrl: `${image}`,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
            });
          }
        });
    } else {
      // Swal.fire({
      //   title: "User Login Successfully",
      //   confirmButtonColor: "#3085d6",
      //   confirmButtonText: "Login Now!",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     navigate("/login", { state: { from: location } });
      //   }
      // });
      Swal.fire({
        title: "User Login Please",
        showDenyButton: true,
        confirmButtonText: "Login Now!",
        denyButtonText: `Don't Login`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="" />
        </figure>
        <h2 className="card-title absolute right-0 mt-4 mr-4 px-2 py-1 bg-black text-white">
          ${price}
        </h2>
        <div className={`${isDarkTheme ? "dark-theme" : "white-theme"}`}>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <div className="card-actions">
              <button
                onClick={() => handleAddToCart(item)}
                className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-200 border-orange-400"
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefItem;
