import React, { useState, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, MenuItem, Select } from '@mui/material';
import { publicApi } from "../../../../Api/Api";
import { UserContext } from '../../../../Context/AllContext/UserContext';
import { getIdToken } from 'firebase/auth';
import { toast } from 'react-hot-toast';

function Tempelate({ children }) {
    return (
        <div className='flex gap-[12px]'>
            <p>{children[0]}:</p>
            <p>{children[1]}</p>
        </div>
    )
}

function OrderDetailsCard({ item }) {

    let user = useContext(UserContext);
    const [status, setStatus] = useState(item.status);
    const [loader, setLoader] = useState(false);

    return (
        <div className='w-[80%] p-[16px] border border-solid border-black flex flex-col gap-[16px]'>
            <Tempelate children={["Name", item.user_id?.firstname + " " + item.user_id?.lastname]} />
            <Tempelate children={["Email", item.user_id?.email]} />
            <div className='flex gap-[12px]'>
                <p>Status:</p>
                <FormControl sx={{
                    width: "100%",
                }}>
                    <Select value={status} onChange={async (e) => {
                        if(!loader){
                            setLoader(true);
                            let token = await getIdToken(user.user);
                            publicApi.post("/order/status", {
                                userId: item.user_id?._id,
                                status: e.target.value
                            }, {
                                headers: {
                                    authorization: token
                                }
                            }).then(() => {
                                setStatus(e.target.value);
                                toast.success("Status Changed");
                                setLoader(false);
                            }).catch(() => {
                                toast.error("Server error occured");
                                setLoader(false);
                            })
                        }
                    }} sx={{
                        height: "50px"
                    }}>
                        <MenuItem value={"Processing"}>Processing</MenuItem>
                        <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Tempelate children={["Price", "₹" + item.totalPrice]} />
            <Tempelate children={["Shipping Price", "₹" + item.shippingPrice]} />
            <Tempelate children={["Phone No.", item.shippingId?.mobile]} />
            <Tempelate children={["Pincode", item.shippingId?.pincode]} />
            <Tempelate children={["State", item.shippingId?.state]} />
            <Tempelate children={["Address", item.shippingId?.address]} />
            <Tempelate children={["City", item.shippingId?.city]} />
            <div className='flex gap-[12px]'>
                <p>Products:</p>
                <div>
                    {
                        item.products?.map((item,index1) => {
                            let details = [
                                `(${item.quantity})`,
                                item.product_id?.name,
                                item.details?.weight
                            ];
                            return (
                                <div key={`data_${index1}`} className='flex gap-[8px]'>
                                    {
                                        details.map((dataa,index2) => {
                                            return (
                                                <p key={`data_${index1}_${index2}`}>
                                                    {dataa}
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function OrderDetails({ popup, details, setPopup }) {

    return (
        <>
            <div className={`fixed top-[0%] duration-500 ${popup ? "right-[0%]" : "right-[-150%]"} sm:w-[80vw] md:w-[60vw] xl:w-[40vw] h-[120vh] sm:h-[100vh] bg-[#FFFFFF] p-[16px] z-[15]`}>
                <div>
                    <CloseIcon onClick={() => {
                        setPopup(false);
                    }} sx={{
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }} />
                </div>
                <div className='w-[100%] h-[100%] p-[16px] flex flex-col items-center overflow-y-scroll'>
                    {
                        details.map((item) => {
                            return (
                                <>
                                    <OrderDetailsCard key={item._id} item={item} />
                                </>
                            );
                        })
                    }
                </div>
            </div>
            {
                (popup) && <div onClick={() => {
                    setPopup(false);
                }} className='fixed top-[0%] left-[0%] w-[100vw] h-[100vh] bg-[rgb(0,0,0,0.4)] z-[14]'></div>
            }
        </>
    )
}

export default OrderDetails;