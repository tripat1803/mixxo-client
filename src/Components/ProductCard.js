import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/AllContext/CartContext";
import { toast } from "react-hot-toast";
import { UserContext } from "../Context/AllContext/UserContext";

function ProductCard({ id, imageUrl, title, productDetails, titleWidth = "90%", setFlag = (param) => { } }) {

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

  // console.log(productDetails);

  return (
    <div className=" w-[13rem] md:w-[20rem] h-full hover: cursor-pointer flex flex-col">
      <div className="flex flex-col items-center" onClick={() => {
        navigate(`/product?product=${id}`);
        setFlag(true);
      }}>
        <div className="h-[16.5rem] w-[90%] md:w-[61%] rounded-[100px] relative overflow-hidden object-contain chocolate">
          <img
            className="w-[120%] h-full object-cover"
            src={imageUrl}
            alt="prod-im"
            style={{
              width:"150%"
            }}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 24px 0px 24px",
          }}
        >
          <Typography
            sx={{
              width: titleWidth,
              fontSize: "170%",
              fontFamily: "Cookie",
              textAlign: "center",
              lineHeight: "110%",
              height: "100%"
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              padding: "12px",
              fontSize: "18px"
            }}
          >
            <p className="text-[15px] text-zinc-700">Weight: {productDetails?.productDetailsId?.weight} </p>
            <p className="text-[15px] text-zinc-700">Price: ₹{productDetails?.productDetailsId?.price}</p>
          </Typography>
        </Box>
      </div>
      <Box sx={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Button onClick={(e) => {
          e.preventDefault();
          if(firebaseUser){
            if (id && productDetails && productDetails.productDetailsId._id) {
              if (!loader) {
                setLoader(true);
                cart.updateCart(id, productDetails.productDetailsId._id, "PUSH").then(() => {
                  notify();
                  cart.setFlag(true);
                  setLoader(false);
                }).catch((err) => {
                  toast.error(err.response.data.message);
                  setLoader(false);
                });
              }
            }
          } else {
            usernotfound();
          }
        }} sx={{
          width: "60%",
          bgcolor: "white",
          borderRadius: "100px",
          border: "2px solid black",
          fontSize: "0.8rem",
          fontWeight: "bold",
          transition: "all 0.5s",
          textTransform: "none",
          fontFamily: "Montserrat",
          color: "#8B5F4D",
          "&:hover": { bgcolor: "#8B5F4D", color: "white", border: "2px solid #8B5F4D", }
        }} variant='contained'>Add To Cart</Button>
      </Box>
    </div>
  );
}

export default ProductCard;
