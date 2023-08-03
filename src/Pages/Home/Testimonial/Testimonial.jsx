import React, { useState, useEffect } from "react";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Rating } from "@smastrom/react-rating";

const Testimonial = () => {
  const [rivews, setReviws] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => {
        setReviws(data);
      });
  }, []);

  return (
    <section className="my-20">
      <SectionTitle
        subHeading={"---What Our Clients Say---"}
        heading="TESTIMONIALS"
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {rivews.map((rivew) => (
          <SwiperSlide key={rivew._id}>
            <div className="flex flex-col items-center m-24">
              <Rating style={{ maxWidth: 180 }} value={rivew.rating} readOnly />
              <h3 className="text-6xl font-bold mt-8">

                <FaQuoteLeft />
              </h3>
              <p className="py-8">{rivew.details}</p>
              <h2 className="text-2xl text-yellow-500 font-semibold">
                {rivew.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
