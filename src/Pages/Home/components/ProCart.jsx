import React, { useContext, useEffect, useState } from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CartContext } from "../../../Context/AllContext/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ClickAwayListener, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../../Context/AllContext/UserContext";

function CartCard({ item, quantity }) {
  let [count, setCount] = useState(1);
  let cart = useContext(CartContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  return (
    <div className="w-full flex justify-center items-center gap-[8px] py-2">
      <CloseRoundedIcon
        fontSize="large"
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          if (!loader) {
            if (item) {
              setLoader(true);
              cart
                .updateCart(item.product_id._id, item.details._id, "REMOVE")
                .then(() => {
                  cart
                    .fetchCart()
                    .then((res) => {
                      cart.setCart(res.data.products);
                      setLoader(false);
                    })
                    .catch((err) => {
                      if (err.request.status) {
                        return toast.error(err.response.data.message);
                      } else {
                        toast.error("Something went wrong");
                      }
                    });
                })
                .catch((err) => {
                  if (err.request.status) {
                    return toast.error(err.response.data.message);
                  } else {
                    toast.error("Something went wrong");
                  }
                });
            }
          }
        }}
      />
      <img
        src={item?.product_id.image[0]?.url}
        style={{
          width: "10%",
        }}
        alt=""
      />
      <div className="text-[10px] flex-grow">
        <div>
          <b>
            {item?.product_id.name.substring(0, 12)}
            <span
              style={{
                opacity: "0.5",
              }}
            >
              {item?.product_id.name.substring(12, 16)}...
            </span>
          </b>
        </div>
        <div>Weight: {item?.details?.weight}</div>
        <b>Price: ₹{item?.details?.price}</b>
      </div>
      <div className="flex">
        <button
          disabled={loader}
          onClick={() => {
            if (count > 1) {
              setLoader(true);
              cart
                .updateCart(item.product_id._id, item.details._id, "DECREMENT")
                .then(() => {
                  cart
                    .fetchCart()
                    .then((res) => {
                      cart.setCart(res.data.products);
                      setLoader(false);
                    })
                    .catch((err) => {
                      if (err.request.status) {
                        return toast.error(err.response.data.message);
                      } else {
                        toast.error("Something went wrong");
                      }
                    });
                })
                .catch((err) => {
                  if (err.request.status) {
                    return toast.error(err.response.data.message);
                  } else {
                    toast.error("Something went wrong");
                  }
                });
            }
            if (count === 1) {
              if (item) {
                setLoader(true);
                cart
                  .updateCart(item.product_id._id, item.details._id, "REMOVE")
                  .then(() => {
                    cart
                      .fetchCart()
                      .then((res) => {
                        cart.setCart(res.data.products);
                        setLoader(false);
                      })
                      .catch((err) => {
                        if (err.request.status) {
                          return toast.error(err.response.data.message);
                        } else {
                          toast.error("Something went wrong");
                        }
                      })
                      .catch((err) => {
                        if (err.request.status) {
                          return toast.error(err.response.data.message);
                        } else {
                          toast.error("Something went wrong");
                        }
                      });
                  })
                  .catch((err) => {
                    if (err.request.status) {
                      return toast.error(err.response.data.message);
                    } else {
                      toast.error("Something went wrong");
                    }
                  });
              }
            }
          }}
        >
          <RemoveIcon />
        </button>
        <Typography
          sx={{
            padding: "6px 10px",
            border: "1px solid black",
            background: "white",
          }}
        >
          {count}
        </Typography>
        <button
          disabled={loader}
          onClick={() => {
            setLoader(true);
            cart
              .updateCart(item.product_id._id, item.details._id, "INCREMENT")
              .then(() => {
                cart
                  .fetchCart()
                  .then((res) => {
                    cart.setCart(res.data.products);
                    setLoader(false);
                  })
                  .catch((err) => {
                    if (err.request.status) {
                      return toast.error(err.response.data.message);
                    } else {
                      toast.error("Something went wrong");
                    }
                  });
              })
              .catch((err) => {
                if (err.request.status) {
                  return toast.error(err.response.data.message);
                } else {
                  toast.error("Something went wrong");
                }
              });
          }}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
}

function Cart(props) {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let route = useLocation();
  let navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [mongoUser, setMongoUser] = useState();
  const [location, setLocation] = useState("");

  useEffect(() => {
    setCartData(cart.cart);
  }, [cart.cart]);

  useEffect(() => {
    setMongoUser(user.mongoUser);
  }, [user.mongoUser]);

  useEffect(() => {
    setLocation(route.pathname);
  }, [route.pathname]);

  return (
    <ClickAwayListener onClickAway={props.data}>
      <div
        className={`w-[360px] h-[400px] z-30 duration-500 absolute top-[88%] ${
          (mongoUser) ? "right-[94px]" : "right-[73px]"
        } rounded-[15px] bg-[#F5F5F5] p-6 flex flex-col items-center justify-centers gap-[1.4rem]`}
      >
        {location === "/" && <div className="w-0 h-0 border border-transparent border-x-[20px] border-b-[30px] border-b-[#F5F5F5] absolute top-[-12%] right-[10px] m-8"></div>}
        <div className="w-full flex justify-between gap-[1rem]">
          <span className="flex justify-center items-center gap-[1rem]">
            <ArrowCircleUpRoundedIcon
              className="-rotate-90"
              fontSize="large"
              onClick={props.data}
            />
            <p>Continue Shopping</p>
          </span>
          <AddShoppingCartRoundedIcon fontSize="large" />
        </div>
        <div className="w-[100%] h-[4%] bg-[#eed8c2] text-[#eed8c2] rounded-[100px] shadow-cartShadow">
          ll
        </div>
        <div className="font-cookie underline font-[500] text-[2.7rem] text-[rgb(51, 42, 42)] self-start mt-[-0.5rem]">
          Your bag
        </div>
        <div className="w-full h-[60%] bg-[#f6ebe0] rounded-[15px] flex flex-col items-center overflow-scroll px-[8px] pb-[16px] pt-[8px]">
          {cartData?.length !== 0 ? (
            cartData?.map((item, index) => {
              return (
                <CartCard key={item} item={item} quantity={item.quantity} />
              );
            })
          ) : (
            <div>Cart is Empty!!</div>
          )}

          <button
            onClick={() => {
              if (cartData?.length !== 0) {
                navigate("/cart");
                props.data();
              } else {
                toast.error("Cart is empty!");
              }
            }}
            className="bg-[#765447] border-none h-8 w-44 mt-[42%] text-xl font-[700] text-[#f6ebe0] rounded-[6px] absolute tracking-wide"
          >
            Checkout
          </button>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default Cart;
