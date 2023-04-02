import React from "react";

export default function Empty({ message }) {
  return (
    <div className="w-[100%] h-[300px] flex justify-center items-center col-span-full">
      <p className="w-[max-content] h-[max-content] text-[20px] text-center font-semibold">
        {message}
      </p>
    </div>
  );
}
