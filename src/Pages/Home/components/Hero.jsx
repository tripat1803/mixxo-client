import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative flex items-end justify-center mb-16 min-h-[50vh] xxs:min-h-[70vh] lg:min-h-[100vh]">
      <Link
        to="/shop"
        className="p-[8px_18px] text-sm font-semibold rounded-full z-10 mb-3 bg-[#633D28] text-white transition-all duration-500 ease-in-out flex items-center justify-center"
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
        src={require("../../../Assets/hero-responsive.png")}
        alt="ima"
      />
    </div>
  );
}