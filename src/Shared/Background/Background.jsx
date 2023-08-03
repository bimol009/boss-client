import React from "react";
import "./Background.css";
import { Parallax } from "react-parallax";

const Background = ({ image, title }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={image}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div className="hero min-h-screen my-10">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="bg-white text-black py-10 px-24">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum <br /> deserunt ratione
              dolor officiis praesentium! Deserunt magni aperiam dolor eius
              dolore at, nihil iusto <br />
              ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Background;
