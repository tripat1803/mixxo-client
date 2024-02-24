import React from "react";
import FootImg from "../Assets/footimg.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer
			id="footer"
			className="w-full px-8 py-10 gap-[32px] bg-[#fae0bf] flex justify-center items-center"
		>
			<img
				className="hidden lg:flex w-[75%] sm:w-[55%] md:w-[25%]"
				src={FootImg}
				alt="winter is comming"
				width="25%"
			/>

			<div className="w-[100%] lg:w-[60%] flex flex-col md:flex-row justify-center items-center text-[#824a23] gap-[4rem] [&_h3]:text-[120%] [&_h3]:font-[700] [&_p]:font-[500] [&_p]:hover:cursor-pointer transition-all duration-500">
				<div className="w-[100%] xxs:w-[80%] grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 gap-[4rem]">
					<div className="">
						<h3 className="mb-2">Shop</h3>
						<p className="hover:scale-105 duration-200"><Link to="/shop">All</Link></p>
						<p className="hover:scale-105 duration-200"><Link to="/shop">Hot Chocolate</Link></p>
						<p className="hover:scale-105 duration-200">brands</p>
						<p className="hover:scale-105 duration-200">shipment</p>
						<p className="hover:scale-105 duration-200">Accessories</p>
					</div>
					<div className="">
						<h3 className="text-[120%] font-[700] mb-2">Support</h3>
						<p className="hover:scale-105 duration-200">Return</p>
						<p className="hover:scale-105 duration-200">Shipping</p>
						<p className="hover:scale-105 duration-200">Privacy Policy</p>
						<p className="hover:scale-105 whitespace-nowrap duration-200">Terms of Use</p>
					</div>
					<div className="">
						<h3 className="text-[120%] font-[700] mb-2">Follow</h3>
						<p className="hover:scale-105 duration-200">Instagram</p>
						<p className="hover:scale-105 duration-200">Facebook</p>
						<p className="hover:scale-105 duration-200">Linkedin</p>
						<p className="hover:scale-105 duration-200">Twitter</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
