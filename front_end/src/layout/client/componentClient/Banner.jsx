import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from your API
    async function fetchBanners() {
      try {
        const response = await fetch(
          "https://my-worker.namdaynay001.workers.dev/banners"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setBanners(data); // Assuming the data is an array of banners with image URLs
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);

  const settings = {
    infinite: true, // Infinite scrolling
    speed: 500, // Speed of the transition
    slidesToShow: 1, // Number of slides visible at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplaySpeed: 1000,
    autoplay: true,
  };

  return (
    <div className="w-full">
      {banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner.id}>
              <img
                src={banner.image}
                alt={`Banner ${banner.id}`}
                className="w-full h-[500px]"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div>Loading banners...</div>
      )}
    </div>
  );
};

export default Banner;
