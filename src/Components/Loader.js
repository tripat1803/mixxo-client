import Lottie from "lottie-react";
import React from "react";

function Loader() {
  return (
    <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center z-30 bg-[#FFF8EF]">
      <div className="w-full flex flex-col items-center">
        <Lottie
          style={{
            width: "270px",
          }}
          animationData={require("../Assets/Lottie/loader2.json")}
        />
      </div>
    </div>
  );
}

export default Loader;
