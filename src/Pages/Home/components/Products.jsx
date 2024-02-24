import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Empty from "../../../Components/Empty";
import ProductCard from "../../../Components/ProductCard";

function Products({ title, dataArr }) {
  const [total, setTotal] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (dataArr) {
      setTotal(dataArr.filter((item, index) => {
        return index <= 3;
      }));
    }
  }, [dataArr]);

  useEffect(() => {
    if(total.length !== 0){
      if(Number(window.innerWidth) < 920 && total.length === 3){
        setIndex(1);
      } else {
        setIndex(0);
      }
    }
  }, [total]);

  // window.onresize = function () {
  //   if(Number(window.innerWidth) < 920){
  //     setIndex(1);
  //   } else {
  //     setIndex(0);
  //   }
  // };

  // console.log(index, window.innerWidth);

  return (
    <div className="py-12">
      {total && total.length !== 0 && <p className="text-center px-6 pb-6 font-semibold text-4xl">
        {title}
      </p>}
      <div className="h-[100%] flex justify-center px-8 py-8">
        {total && total.length !== 0 && (
          <div className="w-[90%] sm:w-[80%] xl:w-[70%] max-w-[1500px] flex flex-wrap justify-center sm:justify-evenly gap-[64px_32px]">
            {total?.slice(index).map(
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
