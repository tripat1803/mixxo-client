import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import { RecommendContext } from "../../../Context/AllContext/RecommendContext";

function HomeProduct() {
  let productArr = useContext(RecommendContext);
  const [product, setProduct] = useState({
    total: [],
  });

  useEffect(() => {
    if (productArr.products) {
      setProduct(productArr.products);
    }
  }, [productArr.products]);

  return (
    <>
      <p className="text-center px-6 pb-12 font-semibold text-4xl">
        Products You May Like
      </p>
      <Products dataArr={product.total} />
    </>
  );
}

export default HomeProduct;
