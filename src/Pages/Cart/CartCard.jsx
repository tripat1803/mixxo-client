import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from '../../Context/AllContext/CartContext';
import { Box, IconButton, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

function CartCard({ productId, detailsId, imageUrl, name, weight, price, discount, quantity }) {

    let cart = useContext(CartContext);
    let [count, setCount] = useState(1);
    const [flag, setFlag] = useState(false);
    const [type, setType] = useState("");
    const [loader, setLoader] = useState(false);

    if (flag) {
        setLoader(true);
        cart.updateCart(productId, detailsId).then(() => {
            cart.fetchCart().then((res) => {
                cart.setCart(res.data.products);
                setLoader(false);
            }).catch((err) => {
                if (err.request.status) {
                  return toast.error(err.response.data.message);
                }else{
                    toast.error("Something went wrong");
                }
              });
        }).catch((err) => {
            if (err.request.status) {
              return toast.error(err.response.data.message);
            }else{
                toast.error("Something went wrong");
            }
          });
        setFlag(false);
    }

    useEffect(() => {
        setCount(quantity);
    }, [quantity]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: { md: "row", lg: "row", xl: "row", sm: "row", xs: "column" },
            borderBottom: "2px solid #8B5F4D",
        }}>
            <Box sx={{
                width: "20%",
                padding: "8px 0px",
                display: { md: "block", lg: "block", xl: "block", sm: "block", xs: "none" }
            }}>
                <img style={{
                    height: "100%",
                    width: "100%"
                }} src={imageUrl} alt="product-image" />
            </Box>
            <Box sx={{
                width: { md: "80%", lg: "80%", xl: "80%", sm: "80%", xs: "100%" },
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // alignItems: {xs: "center", sm: "left", md: "left", lg: "left", xl: "left"}
                // background: "#FAE0BF"
            }}>
                <Box sx={{
                    padding: "0px 16px"
                }}>
                    <Typography sx={{
                        fontSize: "22px"
                    }}>{name}</Typography>
                    <Typography sx={{
                        fontSize: "18px"
                    }}>{weight}</Typography>
                    <Typography sx={{
                        fontSize: "18px",
                        padding: "12px 0px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                        <span style={{ fontWeight: "600", fontSize: "20px" }}>₹{price}</span>
                        <span style={{ color: "green", fontSize: "12px" }}>{discount}% off</span>
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    // justifyContent: {xs: "center", sm: "left", md: "left", lg: "left", xl: "left"},
                    gap: "8px"
                }}>
                    <IconButton onClick={() => {
                        if (!loader) {
                            if (count !== 1) {
                                setLoader(true);
                                cart.updateCart(productId, detailsId, "DECREMENT").then(() => {
                                    cart.fetchCart().then((res) => {
                                        cart.setCart(res.data.products);
                                        setLoader(false);
                                    }).catch((err) => {
                                        if (err.request.status) {
                                          return toast.error(err.response.data.message);
                                        }else{
                                            toast.error("Something went wrong");
                                        }
                                      })
                                }).catch((err) => {
                                    if (err.request.status) {
                                      return toast.error(err.response.data.message);
                                    }else{
                                        toast.error("Something went wrong");
                                    }
                                  });
                            }
                            if (count === 1) {
                                if (productId && detailsId) {
                                    setLoader(true);
                                    cart.updateCart(productId, detailsId, "REMOVE").then(() => {
                                        cart.fetchCart().then((res) => {
                                            cart.setCart(res.data.products);
                                            setLoader(false);
                                        }).catch((err) => {
                                            if (err.request.status) {
                                              return toast.error(err.response.data.message);
                                            }else{
                                                toast.error("Something went wrong");
                                            }
                                          });
                                    }).catch((err) => {
                                        if (err.request.status) {
                                          return toast.error(err.response.data.message);
                                        }else{
                                            toast.error("Something went wrong");
                                        }
                                      });
                                }
                            }
                        }
                    }}><RemoveIcon /></IconButton>
                    <div disabled style={{
                        background: "white",
                        height: "100%",
                        padding: "8px",
                        width: "60px",
                        textAlign: "center"
                    }}>{count}</div>
                    <IconButton onClick={() => {
                        if (!loader) {
                            setLoader(true);
                            cart.updateCart(productId, detailsId, "INCREMENT").then(() => {
                                cart.fetchCart().then((res) => {
                                    cart.setCart(res.data.products);
                                    setLoader(false);
                                })
                                  .catch((err) => {
                                    if (err.request.status) {
                                      return toast.error(err.response.data.message);
                                    }else{
                                        toast.error("Something went wrong");
                                    }
                                  });
                            }).catch((err) => {
                                if (err.request.status) {
                                  return toast.error(err.response.data.message);
                                }else{
                                    toast.error("Something went wrong");
                                }
                              });
                        }
                    }}><AddIcon /></IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default CartCard;