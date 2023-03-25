import { Box } from '@mui/material';
import { getIdToken } from 'firebase/auth';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { publicApi } from '../../../Api/Api';
import { UserContext } from '../../../Context/AllContext/UserContext';
import Lottie from "lottie-react";

function OrderCard({ item }) {
    let date = new Date(item.createdAt);

    return (
        <div className="w-[85%] sm:w-[70%] border border-black rounded-[20px] pt-[8px] overflow-hidden">
            <div className='p-[16px] flex flex-col sm:flex-row md:flex-row gap-[8px] sm:gap-[32px] border-black border-b'>
                <div>
                    <p>Order Placed</p>
                    <p>{date.toDateString()}</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>₹{item.totalPrice}</p>
                </div>
            </div>
            <Box sx={{
                overflowY: "scroll",
                maxHeight: "250px",
                "&::-webkit-scrollbar": {
                    display: "block",
                    width: "3px"
                },
                "&::-webkit-scrollbar-thumb": {
                    borderRadius: "8px",
                    visibility: "visible",
                    background: "rgb(139,95,77,0.4)"
                },
                padding: "6px"
            }}>
                {
                    item.products.map((prods,index) => {
                        return(
                            <div key={`item_${index}`} className="p-[16px] flex flex-row 2xl:flex-nowrap xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap items-center justify-between gap-[0%] border-b border-b-black">
                                <div className="basis-full">
                                    <p className="font-cookie text-3xl">
                                        {prods.product_id.name}
                                    </p>
                                    <p>
                                        <span className='mr-[8px]'>Weight:</span>
                                        <span>{prods.details.weight}</span>
                                    </p>
                                    <p>
                                        <span className='mr-[8px]'>Price:</span>
                                        <span>₹{prods.details.price}</span>
                                    </p>
                                    <p>
                                        <span className='mr-[8px]'>Quantity:</span>
                                        <span>{prods.quantity}</span>
                                    </p>
                                </div>
                                <div className="w-full h-[220px] justify-center 2xl:block xl:block lg:block md:flex sm:flex flex 2xl:py-0 xl:py-0 lg:py-0 md:py-5 sm:py-5 py-5">
                                    <img
                                        className="w-[25rem] h-[100%] object-cover rounded-[20px] shadow-md shadow-zinc-500"
                                        src={prods.product_id.image[0].url}
                                        alt="proimg"
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </Box>
            <div className='p-[16px] flex gap-[32px]' style={{
                boxShadow: "0px 0px 67px -30px rgba(0,0,0,0.4)"
            }}>
                <div>
                    <p>Status</p>
                    <p>{item.status}</p>
                </div>
            </div>
        </div>
    )
}

function Order() {
    let user = useContext(UserContext);
    // let [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);

    const getOrderDetails = async (user) => {
        setLoader(true);
        let token = await getIdToken(user);
        if (token) {
            publicApi.post("/order/", {}, {
                headers: {
                    authorization: token
                }
            }).then((res) => {
                console.log(res.data);
                setOrderDetails(res.data);
                setLoader(false);
            }).catch(() => {
                setLoader(false);
            });
        }
    }

    useEffect(() => {
        if (user.user) {
            getOrderDetails(user.user);
        }
    }, [user.user]);

    return (
        <div className="py-14 w-full bg-[#fae0bf] flex flex-col justify-center items-center space-y-10 gap-[5%] rounded-[20px]">
            {
                (loader) && <Box sx={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Lottie style={{
                        width: "100px",
                        height: "100px"
                    }} animationData={require("../../../Assets/Lottie/loader.json")} />
                </Box>
            }
            {
                (!loader && orderDetails.length !== 0) && orderDetails.map((item, index) => {
                    return(
                        <OrderCard key={`orderCard_${index}`} item={item} />
                    );
                })
            }
            {
                (!loader && orderDetails.length === 0) && <Box sx={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <p>No Orders Placed</p>
                </Box>
            }
            {/* <p className="font-[600] hover:cursor-pointer" onClick={() => {
                if (!loader) {
                    setPage(++page);
                }
            }}>Show more ...</p> */}
        </div>
    )
}

export default Order;