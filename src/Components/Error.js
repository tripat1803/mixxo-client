import React from "react";
import Lottie from "lottie-react";

function Error() {
  return (
    <div className="bg-[#FEBB8A]">
      <Lottie
        style={{
          width: "100vw",
          height: "100vh",
        }}
        animationData={require("../Assets/Lottie/error.json")}
      />
    </div>
  );
}

export default Error;
