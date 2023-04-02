import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Profile from "./Pages/Profile/Profile";
import Error from "./Components/Error";
import { UserContext } from "./Context/AllContext/UserContext";
import { RecommendContext } from "./Context/AllContext/RecommendContext";
import Loader from "./Components/Loader";
import { CartContext } from "./Context/AllContext/CartContext";
import Product from "./Pages/Product/Product";
import Account from "./Pages/Profile/components/Account";
import Order from "./Pages/Profile/components/Order";
import Cart from "./Pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import About from "./Pages/About/About";
import Header from "./Pages/Home/components/Header";
import Footer from "./Pages/Home/components/Footer";
import AdminRoutes from "./Routes/AdminRoutes";
import Admin from "./Pages/Admin/Admin";
import { CategoryContext } from "./Context/AllContext/CategoryContext";

function App() {
	let location = useLocation();
	let user = useContext(UserContext);
	let product = useContext(RecommendContext);
	let cart = useContext(CartContext);
	let category = useContext(CategoryContext);
	const [flag, setFlag] = useState(true);
	const [flag1, setFlag1] = useState(false);
	const [flag2, setFlag2] = useState(true);
	const [flag3, setFlag3] = useState(false);

	const [server, setServer] = useState(false);
	const [server2, setServer2] = useState(false);

	useEffect(() => {
		setFlag1(user.loader);
	}, [user.loader]);

	useEffect(() => {
		setFlag2(product.loader);
	}, [product.loader]);

	useEffect(() => {
		setFlag3(cart.loader);
	}, [cart.loader]);

	useEffect(() => {
		setFlag(true);
		setTimeout(() => {
			setFlag(false);
		}, 1500);
	}, []);

	useEffect(() => {
		setServer(category.server);
	}, [category.server]);

	useEffect(() => {
		setServer2(product.server);
	}, [product.server]);

	return (
		<>
			{(flag1 || flag2 || flag || flag3) && <Loader />}
			{
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/about" element={<About />} />
					<Route path="/profile/account" element={<Profile comp={<Account />} />} />
					<Route path="/profile/order" element={<Profile comp={<Order />} />} />
					<Route path="/product" element={<Product />} />

					<Route path="/admin/*" element={<Admin component={<AdminRoutes />} server={server} serve2={server2} />} />

					{/* Error */}
					<Route path="*" element={<Error />} />
				</Routes>
			}
			<Toaster />
		</>
	);
}

export default App;
