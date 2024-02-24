import React from "react";

export default function PopupTmp({
  setOpen = () => {},
  setProduct = () => {},
  children,
}) {
  return (
    <>
      <div className="fixed w-screen/50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[2%] rounded-md max-h-[75%] bg-[white] z-[15] overflow-y-scroll">
        {children}
      </div>
      <div
        onClick={() => {
          setProduct("");
          setOpen(false);
        }}
        className="fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] z-[14]"
      ></div>
    </>
  );
}
