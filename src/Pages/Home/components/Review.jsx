import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Marquee from "react-fast-marquee";

const review = [];

function ReviewCard() {

  const imageArr = [require("../../../Assets/Review/Image1.jpeg"), require("../../../Assets/Review/Image2.jpeg"), require("../../../Assets/Review/Image3.jpeg")]

  return (
    <div className="relative hover:cursor-pointer">
      <img className="absolute w-[100%] h-[100%]" src={imageArr[Math.floor(Math.random() * 3)]} alt="review-im" />
      <p className="revOverlay">
        <h1>Review</h1>
        <p>
          Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt Taxt
          Taxt Taxt.
        </p>
        <span className="text-[10px] text-right mt-[6px]">~ 20 january 2023</span>
      </p>
    </div>
  );
}

const Review = () => {
  return (
    <div className="bg-[#febb8a]">
      <div id="review" className="flex justify-center py-5 md:py-0 px-[48px] md:px-[128px]">
        <div className="lg:w-[100%] xl:w-[60%] 2xl:w-[60%] md:w-[100%] sm:w-[100%] lg:p-[5%] xl:p-[5%_5%_5%_0px] 2xl:p-[5%_5%_5%_0px] md:p-[5%] sm:p-[5%] flex flex-col items-center justify-center">
          <div className="h-[max-content] pb-[32px] break-words text-[38px] text-[#664A3F] text-center font-pacifico flex flex-col space-y-3">
            <p className="landing-[100%]">Browse Our Bestsellers</p>
          </div>
          <div className="bg-[#ffd9a7] h-[max-content] w-[95vw] md:w-[78vw] lg:w-[100%] p-[16px] rounded-[64px]">
            <div className="bg-[#FBE3D2] max-h-[50vh] shadow-reviewShadow rounded-[48px] overflow-scroll -webkit-overflow-scroll">
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
        <div className="hidden relative xl:flex flex-col items-end w-[50%]">
          <img
            className="h-[100%] object-scale-down"
            alt="rev"
            src={require("../../../Assets/Lady.png")}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
