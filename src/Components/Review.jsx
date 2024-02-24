import React from "react";
import Marquee from "react-fast-marquee";

export default function Review() {

  const imageArr = [
    require("../Assets/Review2/Image1.jpg"),
    require("../Assets/Review2/Image2.jpg"),
    require("../Assets/Review2/Image3.jpg"),
    require("../Assets/Review2/Image4.jpg"),
    require("../Assets/Review2/Image5.jpg"),
    require("../Assets/Review2/Image6.jpg"),
    require("../Assets/Review2/Image7.jpg"),
    require("../Assets/Review2/Image8.jpg"),
    require("../Assets/Review2/Image9.jpg"),
    require("../Assets/Review2/Image10.jpg"),
    require("../Assets/Review2/Image11.jpg"),
  ];

  return (
    <div className="bg-gradient-to-b from-[#FE6B0180] from-45% to-[#F79E1B80]">
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
                <ReviewCard key="sdf" imageArr={imageArr.slice(0, 5)} />
              </Marquee>
              <Marquee gradientWidth={0} speed={30}>
                <ReviewCard key="dfgfd" imageArr={imageArr.slice(5, 10)} />
              </Marquee>
              <Marquee gradientWidth={0} speed={40}>
                <ReviewCard key="dfgfdf" imageArr={imageArr.slice(2, 6)} />
              </Marquee>
            </div>
          </div>
        </div>
        <div className="hidden relative xl:flex flex-col items-start w-[50%]">
          <div className="flex items-end justify-center w-full h-[50%] flex-1">
            <img
              className="h-full object-cover"
              alt="rev"
              src={require("../Assets/Lady.png")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ imageArr, key }) {

  return (
    <div className="flex flex-row justify-around row">
      {imageArr.map((image, index) => (
        <div
          key={`review_${key}_${index}`}
          className="relative hover:cursor-pointer "
        >
          <img
            className="absolute w-[100%] h-[100%]"
            src={image}
            alt="review-im"
          />
          <p className="revOverlay">
            <h1>Review</h1>
            <p >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              quaerat repudiandae laborum.
            </p>
            <span className="text-[10px] text-right mt-[6px]">
              ~ 20 january 2023
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
