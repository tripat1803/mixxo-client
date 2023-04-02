import React from "react";
import HeaderNew from "./HeaderNew";
import Footer from "../Pages/Home/components/Footer";

function PageComponent({ children, background = "" }) {
  return (
    <main
      style={{
        background,
      }}
    >
      <HeaderNew />
      {children}
      <Footer />
    </main>
  );
}

export default PageComponent;
