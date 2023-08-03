import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import Background from "../../../Shared/Background/Background";
import Banner from "../Banner/Banner";
import ChefRecomended from "../ChefRecomended/ChefRecomended";
import Featured from "../Featured/Featured";
import FoodCategory from "../FoodCategory/FoodCategory";
import PopularMenu from "../Popular menu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";
import imgPath from "/chef-service.jpg"

const Home = () => {
  const {isDarkTheme, setIsDarkTheme} = useAuth();

  return (
    <div className = {`${isDarkTheme?'dark-theme':'white-theme'}`}>
      <Helmet>
        <title>BistroBoss | Home </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner />
      <FoodCategory></FoodCategory>
      <Background image={imgPath} title="Bistro Boss"></Background>
      <PopularMenu></PopularMenu>
      <ChefRecomended></ChefRecomended>
      <Featured></Featured>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
