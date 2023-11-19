import React, { FC, useState } from "react";
import "./slider.scss";
import { arrow } from "../../constants/svgs";

type SliderProps = {
  images: string[];
  customClass?: string;
};

const ImageSlider: FC<SliderProps> = ({ images, customClass }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const sliderClassName = (customClass ? customClass : "") + "image_slider";

  return (
    <div className={sliderClassName}>
      <button className="prev" onClick={handlePrev}>
        {arrow}
      </button>
      <div className="slider_container">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt="estate"
              key={index}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            />
          );
        })}
      </div>
      <button className="next" onClick={handleNext}>
        {arrow}
      </button>
    </div>
  );
};

export default ImageSlider;
