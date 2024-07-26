import React from "react";
import { Carousel } from "react-bootstrap";

const Banner: React.FC = () => {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="/images/banner1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Luxurious Rooms</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="/images/banner2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Fine Dining Experience</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="/images/banner3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Relaxing Spa Services</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
