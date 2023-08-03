import React from "react";


// Import Swiper React components

import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ChefItem from "../../../Home/ChefRecomended/ChefItem";
import { Swiper, SwiperSlide } from 'swiper/react';

const OrderTab = ({ items }) => {
  return (
    <div>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items?.map((item) => (
              <ChefItem key={item._id} item={item}></ChefItem>
            ))}
          </div>
        </SwiperSlide>
     
      </Swiper>
    </div>
  );
};

export default OrderTab;
