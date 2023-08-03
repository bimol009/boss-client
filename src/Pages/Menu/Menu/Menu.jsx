import React from "react";
import { Helmet } from "react-helmet-async";

import menuImg from "../../../assets/menu/menu-bg.jpg";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import UseMenu from "../../../hooks/UseMenu";
import Background from "../../../Shared/Background/Background";
import PopularMenu from "../../Home/Popular menu/PopularMenu";
import MenuCategory from "./MenuCategory";
import dessertBg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaBg from '../../../assets/menu/pizza-bg.jpg'
import saladBg from '../../../assets/menu/salad-bg.jpg'
import soupBg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
  const [menu] = UseMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>BistroBoss | Menu </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Background image={menuImg} title="Our Menu"></Background>
      {/* Offered Items */}
      <div className="my-10">
      <SectionTitle subHeading={"---Don't miss---"}heading="TODAY'S OFFER"></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
      </div>

      {/* desserts Items */}
      <div className="my-10">
      <MenuCategory items={desserts} title="dessert" image={dessertBg}></MenuCategory>
      </div>
      {/* Pizza Items */}
      <div className="my-10">
      <MenuCategory items={pizzas} title="pizza" image={pizzaBg}></MenuCategory>
      </div>
      {/* Salads Items */}
      <div className="my-10">
      <MenuCategory items={salad} title="salad" image={saladBg}></MenuCategory>
      </div>
      {/* Soup Items */}
      <div className="my-10">
      <MenuCategory items={soup} title="soup" image={soupBg}></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;
