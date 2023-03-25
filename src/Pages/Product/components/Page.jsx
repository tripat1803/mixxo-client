import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../Components/ProductCard";
import Details from "./Details";
import Lottie from "lottie-react";
import Reviews from "./Reviews";

const Page = ({ data, id, related, setFlag, loader2 }) => {

  // const imageArr = [require("../../../Assets/CofCar.jpg"), require("../../../Assets/CofCar.jpg"), require("../../../Assets/hotChoco.png")];
  const [imageArr, setImageArr] = useState([]);
  const [image, setImage] = useState();
  const [productData, setProductData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [productId, setProductId] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setProductId(id);
  }, [id]);

  useEffect(() => {
    setProductData(data);
    setImageArr(data?.image);
    setImage(data?.image[0]?.url);
  }, [data]);

  useEffect(() => {
    setRelatedData(related);
  }, [related]);

  useEffect(() => {
    setLoader(loader2);
  }, [loader2]);

  return (
    <>
      <div className="bg-gradient-to-b from-[#FAE0BF] to-[#FFF8EF]">
        <div className="flex flex-col text-4xl md:text-5xl lg:text-7xl font-black items-center space-y-3 py-14">
          <p className="text-center px-4 md:px-[20%]">
            {" "}
            Your love move: a smoothness of caramel
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center mx-[10%] lg:space-x-20">
          {/* Product Image */}
          <div className="w-full lg:w-[50%] flex flex-col md:flex-row lg:flex-col space-y-10 items-center md:justify-around lg:justify-center pb-16 lg:pb-0 ">
            {(image) ? <><div className="">
              <img
                className="w-[15rem] md:w-[25rem] lg:w-[35rem] rounded-full"
                src={image}
                alt="product"
              />
            </div>
              <div className="flex md:flex-col lg:flex-row space-x-2 md:space-y-4 lg:space-y-0 lg:space-x-2 items-center justify-center overflow-auto">
                {
                  imageArr?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        onClick={() => {
                          setImage(item?.url);
                        }}
                        className="w-[5rem] md:w-[6rem] h-[5rem] md:h-[6rem] border-1 border-black rounded-full object-cover transition-all hover:cursor-pointer hover:border-2"
                        src={item?.url}
                        alt="product"
                      />
                    )
                  })
                }
              </div></> : <div className="h-full">No Preview Available</div>}
          </div>

          {/* Details */}
          <Details item={productData} id={productId} />
        </div>

        <div className="flex flex-col items-center lg:mt-44 py-10">
          <h1 className="font-black text-2xl py-16">You may also like</h1>
          <Box sx={loader && {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {(!loader && relatedData) && <Box>
              {
                relatedData?.map((item) => {
                  return (
                      <ProductCard key={item._id} id={item._id} productDetails={item.details[0]} imageUrl={item.image[0]?.url} title={item.name} setFlag={setFlag} />
                  );
                })
              }
            </Box>}
            {
              loader && <Box sx={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Lottie animationData={require("../../../Assets/Lottie/loader.json")} style={{
                  width: "150px"
                }} />
              </Box>
            }
          </Box>
        </div>
        
        <Reviews productId={productId} total={productData?.totalReviews} />
      </div>
    </>
  );
};

export default Page;
