import React from "react";

import FootImg from "../../../Assets/footimg.jpeg";

const Footer = () => {
	return (
		<footer
			id="footer"
			className="w-full px-8 py-10 gap-[16px] bg-[#fae0bf] flex justify-center items-center"
		>
			<img
				className="hidden lg:flex w-[75%] sm:w-[55%] md:w-[25%]"
				src={FootImg}
				alt="winter is comming"
				width="25%"
			/>

			<div className="w-[90%] lg:w-[60%] flex flex-col md:flex-row text-[#824a23] justify-center gap-[4rem] [&_h3]:text-[120%] [&_h3]:font-[700] [&_p]:font-[500] [&_p]:hover:cursor-pointer transition-all duration-500">
				<div className="flex flex-col xxs:flex-row gap-[4rem]">
					<div className="w-[50%]">
						<h3>Shop</h3>
						<p className="hover:scale-105">All</p>
						<p className="hover:scale-105">Hot Chocolate</p>
						<p className="hover:scale-105">brands</p>
						<p className="hover:scale-105">shipment</p>
						<p className="hover:scale-105">Accessories</p>
					</div>
					<div className="w-[50%]">
						<h3 className="text-[120%] font-[700]">Support</h3>
						<p className="hover:scale-105">Return</p>
						<p className="hover:scale-105">Shipping</p>
						<p className="hover:scale-105">Privacy Policy</p>
						<p className="hover:scale-105">Turms of Use</p>
					</div>
				</div>
				<div className="flex flex-col xxs:flex-row gap-[4rem]">
					<div className="w-[50%]">
						<h3 className="text-[120%] font-[700]">Follow</h3>
						<p className="hover:scale-105">Instagram</p>
						<p className="hover:scale-105">Facebook</p>
					</div>
					<div className="w-[50%]">
						<h3 className="text-[120%] font-[700]">Learn more</h3>
						<p className="hover:scale-105">Research Hub</p>
						<p className="hover:scale-105">FAQ's</p>
						<p className="hover:scale-105">About Us</p>
						<p className="hover:scale-105">Contect Us</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
