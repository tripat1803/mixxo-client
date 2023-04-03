import React from "react";
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
  return (
    <main
      style={{
        background,
      }}
    >
      {route === "/" && [<div className="hidden md:block">
        <Header />
      </div>,
      <div className="block md:hidden">
        <HeaderNew />
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
