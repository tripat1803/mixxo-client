import ScreenComponent from "../../Components/ScreenComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeProduct from "./components/HomeProduct";
import Review from "./components/Review";
import Sub from "./components/Sub";

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HomeProduct />
      <Review />
      <Sub />
      <Footer />
    </main>
    // <ScreenComponent component1={[<Hero/>, <HomeProduct/>]} component2={[<Sub/>]} />
  );
}

export default Home;
