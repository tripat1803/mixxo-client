import ScreenComponent from '../../Components/ScreenComponent';
import Hero from "./components/Hero";
import HomeProduct from './components/HomeProduct';
import Sub from './components/Sub';


function Home() {
    return (
        <ScreenComponent component1={[<Hero/>, <HomeProduct/>]} component2={[<Sub/>]} />
    );
}

export default Home;