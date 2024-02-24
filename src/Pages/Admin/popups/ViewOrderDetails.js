import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { UserContext } from '../../../Context/AllContext/UserContext';
import { publicApi } from '../../../Api/Api';
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

export default function OrderDetailsCard({ item, setShowDetails, reload, setReload }) {

    const options = [
        { value: "Processing", label: "Processing" },
        { value: "Delivered", label: "Delivered" }
    ];
    let user = useContext(UserContext);
    const [status, setStatus] = useState(item?.status);
    const [loader, setLoader] = useState(false);
    const [flag, setFlag] = useState(false);

    async function changeStatus(userId, status){
        if (!loader) {
            if (userId) {
                setLoader(true);
                let token = await getIdToken(user.user);
                publicApi.post("/order/status", {
                    userId: userId,
                    status: status
                }, {
                    headers: {
                        authorization: token
                    }
                }).then(() => {
                    toast.success("Status Changed");
                    setReload(!reload);
                    setLoader(false);
                }).catch((err) => {
                    console.log(err);
                    toast.error("Server error occured");
                    setLoader(false);
                })
            }
        }
    }

    if (flag) {
        changeStatus(item.user_id._id, status);
        setFlag(false);
    }

    return (
        <>
            <div className='fixed w-screen/50 min-h-[90vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[2%] rounded-md bg-[white] z-[15] overflow-y-scroll"'>
                <div className='w-[100%] p-[16px] border border-solid border-black flex flex-col gap-[16px]'>
                    <Tempelate children={["Name", item.user_id?.firstname + " " + item.user_id?.lastname]} />
                    <Tempelate children={["Email", item.user_id?.email]} />
                    <div className='flex gap-[12px]'>
                        <p>Status:</p>
                        <Select defaultValue={{ value: status, label: status }} options={options} onChange={(e) => {
                            setStatus(e.value);
                            setFlag(true);
                        }} />
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
                                item.products?.map((item, index1) => {
                                    let details = [
                                        `(${item.quantity})`,
                                        item.product_id?.name,
                                        item.details?.weight
                                    ];
                                    return (
                                        <div key={`data_${index1}`} className='flex gap-[8px]'>
                                            {
                                                details.map((dataa, index2) => {
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
            </div>
            <div onClick={() => {
                setShowDetails(false);
            }} className="fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] z-[14]"></div>
        </>
    )
}