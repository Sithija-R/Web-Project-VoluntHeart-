import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./ControllArrows";

const MediaCarousel = ({ mediaItems }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {mediaItems.length > 0 && (
        <Slider {...settings}>
          {mediaItems.map((item, index) => (
            <div key={index}>
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="max-h-96 border border-gray-200 p-1 rounded-md m-auto"
                />
              ) : item.type === "video" ? (
                <video
                  controls
                  className="max-h-96 w-full border border-gray-600 p-1 rounded-md m-auto"
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default MediaCarousel;
