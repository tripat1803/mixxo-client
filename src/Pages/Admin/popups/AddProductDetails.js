import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { publicApi } from "../../../Api/Api";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { getIdToken } from 'firebase/auth';

export default function AddProductDetails({ setOpenDetails, setFlag }) {

    let user = useContext(UserContext);
    const [data, setData] = useState({
        weight: "",
        price: 0,
        discount: 0,
        productId: "",
        shippingPrice: 0
    });
    const [loader, setLoader] = useState(false);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    async function getAllProducts() {
        publicApi.get("/product/all").then((res) => {
            if (res.data) {
                setProducts(res.data);
            }
            setFlag(true);
        }).catch((err) => {
            if (err.request.status) {
                return toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        });
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoader(true);
        let token = await getIdToken(user.user);
        if (data.weight !== "" && data.price !== 0 && data.discount !== 0 && data.productId !== "", data.shippingPrice !== 0) {
            publicApi.post(
                "/productdetails/add",
                {
                    weight: data.weight,
                    price: data.price,
                    discount: data.discount,
                    productId: data.productId,
                    shippingPrice: data.shippingPrice
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            ).then(() => {
                setData({
                    weight: "",
                    price: 0,
                    discount: 0,
                    productId: "",
                    shippingPrice: 0
                });
                toast.success("Details Added");
                setLoader(false);
            }).catch(() => {
                toast.error("Error adding Details");
                setLoader(false);
            });
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (products.length !== 0) {
            let data = [];
            products.forEach((item) => {
                let option = {
                    value: String(item._id),
                    label: item.name
                }
                data.push(option);
            })
            setOptions(data);
        }
    }, [products]);

    return (
        <>
            <div className='fixed w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8 bg-[white] z-[15]'>
                <input value={data.weight} onChange={(e) => {
                    setData((prevData) => ({ ...prevData, weight: e.target.value }));
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Weight' />
                <input value={data.price} onChange={(e) => {
                    setData((prevData) => ({ ...prevData, price: e.target.value }));
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Price' />
                <input value={data.discount} onChange={(e) => {
                    setData((prevData) => ({ ...prevData, discount: e.target.value }));
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Discount' />
                <div className='mb-[16px]'>
                    <Select value={data.productId} onChange={(e) => {
                        setData((prevData) => ({ ...prevData, productId: e.value }));
                    }} placeholder={(products.length !== 0) ? "Category" : "No Product added"} options={options} />
                </div>
                <input value={data.shippingPrice} onChange={(e) => {
                    setData((prevData) => ({ ...prevData, shippingPrice: e.target.value }));
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Shipping Price' />
                <button onClick={(e) => {
                    if (!loader) {
                        handleAdd(e);
                    }
                }} className='p-[6px_16px] bg-[#03C9D7] rounded-[10px]'>Add</button>
            </div>
            <div onClick={() => {
                setOpenDetails(false);
            }} className='fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] z-[14]'></div>
        </>
    )
}
