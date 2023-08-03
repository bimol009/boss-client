import React from "react";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import ChefItem from "./ChefItem";
import { useEffect, useState } from "react";
import UseMenu from "../../../hooks/UseMenu";

const ChefRecomended = () => {
  const [menu] = UseMenu();

  const salad = menu.filter((item) => item.category === "salad");

  return (
    <section className="mb-12">
      <SectionTitle
        subHeading={"---Should Try---"}
        heading={"CHEF RECOMMENDS"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {salad.map((item) => (
          <ChefItem key={item._id} item={item}></ChefItem>
        ))}
      </div>
    </section>
  );
};

export default ChefRecomended;
