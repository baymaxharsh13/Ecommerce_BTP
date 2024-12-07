// SwiperComponent.js
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const SwiperComponent = () => {
  const images = [
    "https://www.click.co.uk/wp-content/uploads/2021/09/Digital-Marketing-for-eCommerce-SEO-blog-hero-image-1600x700.png",
    "https://via.placeholder.com/1600x700/FF5733/FFFFFF?text=Image+2",
    "https://via.placeholder.com/1600x700/33C1FF/FFFFFF?text=Image+3",
  ];

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="h-full w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
