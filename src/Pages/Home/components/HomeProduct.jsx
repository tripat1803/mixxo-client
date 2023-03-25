import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import { RecommendContext } from "../../../Context/AllContext/RecommendContext";

function HomeProduct() {
	let productArr = useContext(RecommendContext);
	const [product, setProduct] = useState({
		total: []
	});

	useEffect(() => {
		if(productArr.products){
			setProduct(productArr.products);
		}
	}, [productArr.products]);

	return (
		<>
			<p style={{
				textAlign: "center",
				padding: "0px 24px 48px 24px",
				fontSize: "32px",
				fontWeight: "600"
			}}>Products You May Like</p>
			<Products dataArr={product.total} />
		</>
	);
}

export default HomeProduct;
