import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import { RecommendContext } from "../../../Context/AllContext/RecommendContext";
import Empty from "../../../Components/Empty";

function HomeProduct() {
  let productArr = useContext(RecommendContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (productArr.products) {
      setProduct(productArr.products);
    }
  }, [productArr.products]);

  return (
    <>
      {
        (product.length === 0) && <Empty message={"No Product To Recommend"} />
      }
      {
        (product.length !== 0) && product.map((item, index) => {
          return(
              <Products key={index} title={item._id?.name} dataArr={item.outlets} />
          )
        })
      }
    </>
  );
}

export default HomeProduct;
