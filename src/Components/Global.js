import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Review from "./Review";
import Sub from "../Pages/Home/components/Sub";
import HeaderNew from "./HeaderNew";

export default function Global({ children }) {
  const route = useLocation().pathname;
  var background;
  if (route === "/about" || route === "/cart") {
    background = "#FFF8EF";
  } else if (route === "/product") {
    background = "linear-gradient(180deg, #E4B579 0%, #FFF8EF 23.75%)";
  } else if (route === "/profile/account" || route === "/profile/order") {
    background = "rgba(255, 248, 239, 1)";
  }

  const [background2, setBackground2] = useState("transparent");
  const [position, setPosition] = useState("fixed");

  useEffect(() => {
    if (window.pageYOffset === 0 && route === "/") {
      setBackground2("transparent");
    } else {
      setBackground2("white");
    }

    if (route !== "/") {
      setPosition("sticky");
    } else {
      setPosition("fixed");
    }

    window.onscroll = function () {
      if (window.pageYOffset === 0 && route === "/") {
        setBackground2("transparent");
      } else {
        setBackground2("white");
      }
    };
  }, [route, window.pageYOffset]);

  return (
    <main
      style={{
        background,
      }}
    >
      {route === "/" && [<div className="hidden md:block">
        <Header background={background2} position={position} />
      </div>,
      <div className="block md:hidden">
        <HeaderNew background={background2} position={position} />
      </div>
      ]}
      {route !== "/" && <HeaderNew />}
      {children}
      {(route === "/" || route === "/shop") && <Review />}
      {route === "/" && <Sub />}
      <Footer />
    </main>
  );
}
