import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { publicApi } from '../../../../Api/Api';
import { useContext } from 'react';
import { UserContext } from '../../../../Context/AllContext/UserContext';
import { toast } from 'react-hot-toast';
import { getIdToken } from 'firebase/auth';
import { useEffect } from 'react';

function Tempelate({ children }) {
    return (
        <p className='flex gap-[16px]'>
            <p>{children[0]}:</p>
            <p>{children[1]}</p>
        </p>
    )
}

function ProductDetailsCard({ item, setFlag, setPopup }) {

    let user = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setData(item);
    }, [item]);

    return (
        <div className='w-[70%] p-[16px] border border-solid border-black flex flex-col gap-[16px]'>
            <Tempelate children={["Weight", data?.weight]} />
            <Tempelate children={["Price", "₹" + data?.price]} />
            <Tempelate children={["Discount", data?.discount + "%"]} />
            <Tempelate children={["Shipping Price", "₹" + data?.shippingPrice]} />
            <Box sx={{
                display: "flex",
                gap: "16px"
            }}>
                <Button onClick={async (e) => {
                    e.preventDefault();
                    if(!loader){
                        if(data._id){
                            setLoader(true);
                            let token = await getIdToken(user.user);
                            publicApi.get(`/productdetails/${data._id}`, {
                                headers: {
                                    authorization: token
                                }
                            }).then(() => {
                                setPopup(false);
                                setFlag(true);
                                toast.success("Details deleted");
                                setLoader(false);
                            }).catch(() => {
                                toast.error("Server error occured");
                                setLoader(false);
                            })
                        }
                    }
                }} variant='contained' sx={{
                    width: "100%"
                }}>Delete</Button>
            </Box>
        </div>
    )
}

function ProductDetails({ popup, details, setPopup, setFlag }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(details);
    }, [details]);

    return (
        <>
            <div className={`fixed top-[0%] duration-500 ${popup ? "right-[0%]" : "right-[-150%]"} w-[40vw] h-[120vh] sm:h-[100vh] bg-[#FFFFFF] p-[16px] z-[15]`}>
                <div>
                    <CloseIcon onClick={() => {
                        setPopup(false);
                    }} sx={{
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }} />
                </div>
                <div className='w-[100%] h-[100%] p-[16px] flex flex-col gap-[16px] items-center overflow-y-scroll'>
                    {
                        data?.map((item) => {
                            return (
                                <ProductDetailsCard key={item._id} item={item.productDetailsId} setFlag={setFlag} setPopup={setPopup} />
                            )
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

export default ProductDetails;