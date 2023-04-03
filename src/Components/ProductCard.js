import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/AllContext/CartContext";
import { toast } from "react-hot-toast";
import { UserContext } from "../Context/AllContext/UserContext";

function ProductCard({
  id,
  imageUrl,
  title,
  productDetails,
  titleWidth = "90%",
  setFlag = (param) => { },
}) {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [firebaseUser, setFirebaseUser] = useState();

  const notify = () => toast.success("Added To Cart");
  const usernotfound = () => toast.error("Please Sign In");

  useEffect(() => {
    setFirebaseUser(user.user);
  }, [user.user]);

  const handle = (e) => {
    e.preventDefault();
    if (firebaseUser) {
      if (id && productDetails && productDetails.productDetailsId._id) {
        if (!loader) {
          setLoader(true);
          cart
            .updateCart(id, productDetails.productDetailsId._id, "PUSH")
            .then(() => {
              notify();
              cart.setFlag2(true);
              setLoader(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setLoader(false);
            });
        }
      }
    } else {
      usernotfound();
    }
  };

  return (
    <div className=" w-[13rem] md:w-[20rem] h-full hover: cursor-pointer flex flex-col">
      <div
        className="flex flex-col items-center"
        onClick={() => {
          navigate(`/product?product=${id}`);
          setFlag(true);
        }}
      >
        <div className="h-[16.5rem] w-[90%] md:w-[61%] rounded-[100px] relative overflow-hidden object-contain chocolate">
          <img
            className="w-[120%] h-full object-cover"
            src={imageUrl}
            alt="prod-im"
            style={{
              width: "150%",
            }}
          />
        </div>
        <div className="flex flex-col items-center p-6 pb-0 mt-2">
          <Typography
            sx={{
              width: titleWidth,
              fontSize: "170%",
              fontFamily: "Cookie",
              textAlign: "center",
              lineHeight: "110%",
              height: "100%",
            }}
          >
            {title}
          </Typography>
          <div className="text-center p-3 text-lg">
            <p className="text-[15px] text-zinc-700">
              Weight: {productDetails?.productDetailsId?.weight}{" "}
            </p>
            <p className="text-[15px] text-zinc-700">
              Price: ₹{productDetails?.productDetailsId?.price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handle}
          className="w-[60%] p-2 bg-white text-[#8B5F4D] border-[2px] border-black rounded-[100px] font-bold text-[0.8rem] hover:bg-[#8B5F4D] hover:text-white hover:border-[#8B5F4D] transition-all duration-500"
        >
          {loader ? (
            <div className="lds-dual-ring2"></div>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
