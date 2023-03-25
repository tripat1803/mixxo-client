import React, { useState } from "react";

const Faqs = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full border-b-2 border-black py-4 transition-all cursor-pointer outline-none ${
        isOpen
          ? "bg-zinc-200 rounded-t-xl px-2"
          : "hover:bg-zinc-200 hover:px-2 hover:rounded-t-xl"
      }`}
    >
      <div
        className={`flex flex-row justify-between items-center ${
          isOpen && "font-bold"
        }`}
      >
        <p>How the magic happens?</p>
        <img
          className="w-4"
          src={require("../../../Assets/dropDown.png")}
          alt=""
        />
      </div>

      {isOpen && (
        <p className="text-justify py-3 selection:bg-none">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          labore recusandae, reprehenderit commodi eos, eum odit sunt rerum
          illum blanditiis veritatis ipsam. Nam eveniet magnam, optio tenetur
          sit tempore earum.
        </p>
      )}
    </button>
  );
};

export default Faqs;
