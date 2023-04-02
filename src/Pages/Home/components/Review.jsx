import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Marquee from "react-fast-marquee";

const review = [];

function ReviewCard() {
  const imageArr = [
    require("../../../Assets/Review/Image1.jpeg"),
    require("../../../Assets/Review/Image2.jpeg"),
    require("../../../Assets/Review/Image3.jpeg"),
    require("../../../Assets/Review/Image4.png"),
    require("../../../Assets/Review/Image5.png"),
    require("../../../Assets/Review/Image6.png"),
    require("../../../Assets/Review/Image7.png"),
  ];

  return (
    <div className="relative hover:cursor-pointer ">
      <img
        className="absolute w-[100%] h-[100%]"
        src={imageArr[Math.floor(Math.random() * 7)]}
        alt="review-im"
      />
      <p className="revOverlay">
        <h1>Review</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quaerat
          repudiandae laborum.
        </p>
        <span className="text-[10px] text-right mt-[6px]">
          ~ 20 january 2023
        </span>
      </p>
    </div>
  );
}

const Review = () => {
  return (
    <div className="h-screen/90 bg-gradient-to-b from-[#FE6B0180] from-45% to-[#F79E1B80]">
      <div
        id="review"
        className="flex justify-center py-2 md:py-0 px-[48px] md:px-[128px]"
      >
        <div className="lg:w-[100%] xl:w-[50%] 2xl:w-[50%] md:w-[100%] sm:w-[100%] lg:p-[5%] xl:p-[0%_5%_0%_0px] 2xl:p-[0%_5%_0%_0px] md:p-[5%] sm:p-[5%] flex flex-col-reverse md:flex-col items-center justify-center">
          <div className="h-[max-content] xl:hidden py-[32px] break-words text-[38px] text-[#664A3F] text-center font-pacifico flex flex-col space-y-3">
            <p className="landing-[100%] text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
              Browse Our Bestsellers
            </p>
          </div>
          <div className="bg-[#ffd9a7] h-[max-content] w-[95vw] md:w-[78vw] lg:w-[100%] p-[16px] mt-4 rounded-[164px] sm:rounded-[64px]">
            <div className="bg-[#FBE3D2] max-h-[60vh] shadow-reviewShadow rounded-[148px]  sm:rounded-[48px] overflow-scroll -webkit-overflow-scroll">
              <Marquee gradientWidth={0} speed={40}>
                <div className="flex flex-row justify-around row">
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </div>
              </Marquee>
              <Marquee gradientWidth={0} speed={30}>
                <div className="flex flex-row justify-around row">
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </div>
              </Marquee>
              <Marquee gradientWidth={0} speed={40}>
                <div className="flex flex-row justify-around row">
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                  <ReviewCard />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
        <div className="hidden relative xl:flex flex-col items-start w-[50%]">
          <div className="flex items-end justify-center w-full h-[50%] flex-1">
            <img
              className="h-full object-cover"
              alt="rev"
              src={require("../../../Assets/Lady.png")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
