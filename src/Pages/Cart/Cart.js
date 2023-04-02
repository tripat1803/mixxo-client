import { Box, Button, FormControl, styled } from "@mui/material";
import { getIdToken } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { publicApi } from "../../Api/Api";
import PageComponent from "../../Components/PageComponent";
import UserNotFound from "../../Components/UserNotFound";
import { CartContext } from "../../Context/AllContext/CartContext";
import { UserContext } from "../../Context/AllContext/UserContext";
import { razorpayOptions } from "../../Utils/razorpay";
import CartCard from "./CartCard";
import "../../Components/loaderSpinner.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  let shippingPrice = 100;
  let taxPrice = 100;
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let navigate = useNavigate();
  const [firebaseUser, setFirebaseUser] = useState();
  const [mongoUser, setMongoUser] = useState();
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleProceed = async (e, user) => {
    e.preventDefault();
    if (user) {
      setLoader(true);
      let token = await getIdToken(user);
      let {
        data: { key },
      } = await publicApi.get("/razorpay/getKey", {
        headers: {
          authorization: token,
        },
      });

      let response = await publicApi.get("/shipping/", {
        headers: {
          authorization: token,
        },
      });

      if (response.data.redirect) {
        toast.error("Please Set Shipping Details!");
        navigate("/profile/account");
        return;
      }

      let { data } = await publicApi.post(
        "/razorpay/checkout",
        {
          items: {
            shippingPrice,
            taxPrice,
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      const options = razorpayOptions(
        key,
        data.amount,
        data.userId,
        data.id,
        mongoUser.firstname + (mongoUser.lastname && " ") + mongoUser.lastname,
        mongoUser.email,
        response.data.mobile
      );

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoader(false);
    }
  };

  useEffect(() => {
    setFirebaseUser(user.user);
  }, [user.user]);

  useEffect(() => {
    setMongoUser(user.mongoUser);
  }, [user.mongoUser]);

  useEffect(() => {
    setCartData(cart.cart);
  }, [cart.cart]);

  useEffect(() => {
    if (cartData) {
      setPrice(0);
      cartData.forEach((item) => {
        setPrice((prevPrice) => prevPrice + item.details.price * item.quantity);
      });
    }
  }, [cartData]);

  return (
    <PageComponent>
      <div className="flex justify-center bg-[#FFF8EF]">
        {firebaseUser ? (
          <Box
            sx={{
              minHeight: "100vh",
              display: "grid",
              gridTemplateColumns: {
                lg: "70% 30%",
                xl: "70% 30%",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
              padding: {
                md: "32px",
                lg: "32px",
                xl: "32px",
                sm: "32px",
                xs: "16px",
              },
              justifyItems: "center",
              maxWidth: "1300px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                gridColumn: "1/2",
                gridRow: {
                  lg: "1/2",
                  xl: "1/2",
                  md: "2/3",
                  sm: "2/3",
                  xs: "2/3",
                },
                margin: "32px",
                padding: "0px 8px",
                overflowY: "scroll",
                maxHeight: {
                  md: "80vh",
                  lg: "100vh",
                  xl: "100vh",
                  sm: "60vh",
                  xs: "60vh",
                },
                "&::-webkit-scrollbar": {
                  display: "block",
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "8px",
                  visibility: "visible",
                  background: "rgb(139,95,77,0.4)",
                },
                width: "100%",
              }}
            >
              {cartData.length !== 0 &&
                cartData?.map((item, index) => {
                  return (
                    <CartCard
                      key={`cartcard_${index}`}
                      productId={item?.product_id?._id}
                      detailsId={item?.details?._id}
                      imageUrl={item?.product_id?.image[0]?.url}
                      name={item?.product_id?.name}
                      quantity={item?.quantity}
                      price={item?.details?.price}
                      discount={item?.details?.discount}
                      weight={item?.details?.weight}
                    />
                  );
                })}
              {cartData.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <p className="w-[max-content] h-[max-content] text-[20px] text-center font-semibold">
                    Cart is empty
                  </p>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                gridColumn: {
                  lg: "2/3",
                  xl: "2/3",
                  md: "1/2",
                  sm: "1/2",
                  xs: "1/2",
                },
                gridRow: "1/2",
                margin: "32px",
                width: {
                  md: "50%",
                  sm: "65%",
                  xs: "90%",
                  lg: "90%",
                  xl: "90%",
                },
              }}
            >
              <Box
                sx={{
                  padding: "16px",
                  height: "max-content",
                  background: "#FAE0BF",
                  borderRadius: "16px",
                }}
              >
                <table
                  style={{
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr className="p-3 block">
                      <th className="text-left w-full text-xl">Price:</th>
                      <td className="text-left w-full ">₹{price}</td>
                    </tr>
                    <tr className="p-3 block">
                      <th className="text-left w-full text-xl">Discount:</th>
                      <td className="text-left w-full ">10%</td>
                    </tr>
                    <tr className="p-3 block">
                      <th className="text-left w-full text-xl">Shipping:</th>
                      <td className="text-left w-full ">₹150</td>
                    </tr>
                    <tr className="p-3 block border-black border-2 border-y-0">
                      <th className="text-left w-full text-xl">Total:</th>
                      <td className="text-left w-full ">
                        ₹{price + shippingPrice + taxPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <FormControl
                  sx={{
                    width: "100%",
                    padding: "16px 8px",
                  }}
                >
                  <Button
                    onClick={(e) => {
                      if (!loader) {
                        handleProceed(e, firebaseUser);
                      }
                    }}
                    sx={{
                      bgcolor: "#8B5F4D",
                      borderRadius: "100px",
                      border: "2px solid #8B5F4D",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      transition: "all 0.5s",
                      textTransform: "none",
                      fontFamily: "Montserrat",
                      color: "white",
                      "&:hover": { bgcolor: "white", color: "#8B5F4D" },
                    }}
                    variant="contained"
                  >
                    {loader ? (
                      <div className="lds-dual-ring"></div>
                    ) : (
                      "PROCEED TO PAY"
                    )}
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: "100vh",
            }}
          >
            <UserNotFound />
          </Box>
        )}
      </div>
    </PageComponent>
  );
}

export default Cart;
