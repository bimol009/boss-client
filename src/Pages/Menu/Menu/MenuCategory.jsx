import React from "react";
import Background from "../../../Shared/Background/Background";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, image }) => {
  return (
    <div className="p-8">
      {title && <Background image={image} title={title}></Background>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
        
      </div>
      <div className="text-center my-4">
        <Link to={`/order/${title}`}>
        <button className="btn btn-outline">Order Your Favourite Food</button></Link>
      </div>
    </div>
  );
};

export default MenuCategory;
