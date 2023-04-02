import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Empty from "../../../Components/Empty";
import ProductCard from "../../../Components/ProductCard";

function Products({ dataArr }) {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    if (dataArr) {
      setTotal(dataArr);
    }
  }, [dataArr]);

  return (
    <div className="h-[100%] flex justify-center md:px-8 pb-16  xs:px-2">
      {total && total.length !== 0 && (
        <div className="w-[100%] lg:w-[100%] xl:w-[100%] grid place-items-center gap-[64px_0px] grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
          {total?.map(
            (item, index) =>
              item && (
                <ProductCard
                  key={`product_${index}`}
                  imageUrl={item.product_id.image[0]?.url}
                  title={item.product_id.name}
                  id={item.product_id._id}
                  productDetails={item.product_id.details[0]}
                />
              )
          )}
        </div>
      )}
      {total && total.length === 0 && (
        <Empty message={"No Product To Recommend"} />
      )}
    </div>
  );
}

export default Products;
