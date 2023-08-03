import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import slideImg1 from "../../../assets/home/01.jpg";
import slideImg2 from "../../../assets/home/02.jpg";
import slideImg3 from "../../../assets/home/03.png";
import slideImg4 from "../../../assets/home/04.jpg";
import slideImg5 from "../../../assets/home/05.png";
import slideImg6 from "../../../assets/home/06.png";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img src={slideImg1} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={slideImg2} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={slideImg3} />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src={slideImg4} />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src={slideImg5} />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src={slideImg6} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
