import { getIdToken } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../Context/AllContext/UserContext';
import { publicApi } from '../../../Api/Api';
import { toast } from 'react-hot-toast';
import { BiWindowClose } from "react-icons/bi";

export default function EditProducts({ product, setFlag, setOpenEdit }) {

    let user = useContext(UserContext);
    let imageRef = useRef(null);
    const [data, setData] = useState({
        name: product.name,
        description: product.description,
        image: null
    });
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [images, setImages] = useState([]);

    const handleDelete = async (public_id) => {
        setLoader2(true);
        let token = await getIdToken(user.user);
        if (public_id && product._id) {
            publicApi.post("/product/delete", {
                productId: product._id,
                public_id
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                toast.success("Image Deleted");
                setFlag(true);
                setImages(images.filter((data) => {
                    return data.public_id !== public_id
                }));
                setLoader2(false);
            }).catch(() => {
                toast.error("Error deleting image");
                setLoader2(false);
            })
        }
    }

    const handleSave = async () => {
        setLoader(true);
        let token = await getIdToken(user.user);
        if (data.name !== "" && data.description !== "") {
            publicApi.put("/product/update", {
                name: data.name,
                description: data.description,
                image: data.image
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                toast.success("Product Updated");
                setFlag(true);
                setOpenEdit(false);
                setLoader(false);
            }).catch((err) => {
                toast.error("Error updating products");
                setLoader(false);
            })
        } else {
            toast.error("Name and description fields cannot be empty");
        }
    }

    const handleFile = (e) => {
        e.preventDefault();
        setFileBase(Object.values(e.target.files));
    };

    const setFileBase = (file) => {
        let fileUrls = [];
        file.forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onloadend = (e) => {
                fileUrls.push(reader.result);
            };
        });
        setData((prevData) => ({ ...prevData, image: fileUrls }));
    };

    useEffect(() => {
        setImages(product.image);
    }, [product.image]);

    return (
        <>
            <div className='fixed w-[400px] max-h-[80vh] h-[max-content] overflow-y-scroll top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md bg-[white] z-[15] '>
                <div className='mb-4'>
                    <p className='text-[16px]'>Current Images</p>
                    <div className='flex gap-4 py-4 overflow-x-scroll'>
                        {
                            images?.map((item) => {
                                return (
                                    <div className='relative w-[100px] h-[100px]'>
                                        <img className='w-full h-full z-[13]' src={item.url} alt='product-image' />
                                        <BiWindowClose onClick={(e) => {
                                            e.preventDefault();
                                            if(!loader2){
                                                handleDelete(item.public_id);
                                            }
                                        }} className='absolute top-[2%] right-[2%] text-[red] hover:cursor-pointer'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <input value={data.name} onChange={(e) => {
                    setData((prevData) => ({ ...prevData, name: e.target.value }));
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Name' />
                <textarea
                    value={data.description}
                    onChange={(e) => {
                        setData((prevData) => ({
                            ...prevData,
                            description: e.target.value,
                        }));
                    }}
                    className="w-[100%] h-[150px] mb-2 p-4 border focus:border focus:outline-2"
                    placeholder="Description"
                />
                <input
                    ref={imageRef}
                    onChange={handleFile}
                    type="file"
                    multiple
                    className="w-[100%] p-4 mb-4 border focus:border focus:outline-2"
                    placeholder="Name"
                />
                <button disabled={loader} onClick={(e) => {
                    e.preventDefault();
                    handleSave();
                }} className="p-2 w-[6rem] rounded-[2px] text-sm bg-[#03C9D7] text-white">
                    Save
                </button>
            </div>
            <div onClick={() => {
                setOpenEdit(false);
            }} className='fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] z-[14]'></div>
        </>
    )
}
