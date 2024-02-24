import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Error from "./Components/Error";
import { UserContext } from "./Context/AllContext/UserContext";
import { RecommendContext } from "./Context/AllContext/RecommendContext";
import Loader from "./Components/Loader";
import { CartContext } from "./Context/AllContext/CartContext";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import About from "./Pages/About/About";
import Global from "./Components/Global";
import Category from "./Pages/Shop/components/Category";
import AdminRoutes from "./Pages/Admin/AdminRoutes";

function App() {
  let user = useContext(UserContext);
  let product = useContext(RecommendContext);
  let cart = useContext(CartContext);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 1500);
  }, []);

  return (
    <>
      {(flag || user.loader || product.loader || cart.loader) && <Loader />}
      {
        <Global>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/product" element={<Product />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Global>
      }
      <Toaster />
    </>
  );
}

export default App;
