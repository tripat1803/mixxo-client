import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Empty from "../../../Components/Empty";
import ProductCard from "../../../Components/ProductCard";

function Products({ title, dataArr }) {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    if (dataArr) {
      setTotal(dataArr);
    }
  }, [dataArr]);

  return (
    <div className="py-12">
      {total && total.length !== 0 && <p className="text-center px-6 pb-6 font-semibold text-4xl">
        {title}
      </p>}
      <div className="h-[100%] flex justify-center md:px-8 py-8 xs:px-2">
        {total && total.length !== 0 && (
          <div className="w-[100%] lg:w-[100%] xl:w-[100%] grid place-items-center gap-[64px_0px] grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
            {total?.map(
              (item, index) =>
                item && item.details.length !== 0 && (
                  <ProductCard
                    key={`product_${index}`}
                    imageUrl={item.image[0]?.url}
                    title={item.name}
                    id={item._id}
                    productDetails={item.details[0]}
                  />
                )
            )}
          </div>
        )}
        {total && total.length === 0 && (
          <Empty message={"No Product To Recommend"} />
        )}
      </div>
    </div>
  );
}

export default Products;
