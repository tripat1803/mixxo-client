import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative flex items-end justify-center mb-16 min-h-[100vh]">
      <Link
        to="/shop"
        className="h-[3.5rem] w-[10rem] bg-transparent border-2 border-black text-black font-bold text-lg rounded-full z-10 mb-3 hover:bg-[#d9b088] transition-all duration-500 ease-in-out flex items-center justify-center"
      >
        Shop Now
      </Link>
      <img
        className="sm:flex hidden w-full h-full absolute object-cover object-center"
        src={require("../../../Assets/background.png")}
        alt="ima"
      />
      <img
        className="flex sm:hidden w-full h-full absolute object-cover object-center"
        src={require("../../../Assets/background2.png")}
        alt="ima"
      />
    </div>
  );
}