import { useEffect } from "react";
import Hero from "./components/Hero";
import HomeProduct from "./components/HomeProduct";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <HomeProduct />
    </>
  );
}

export default Home;
