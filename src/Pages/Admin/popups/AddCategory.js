import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { publicApi } from "../../../Api/Api";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";
import { getIdToken } from 'firebase/auth';
import popupcat from '../../../Assets/popupcat.png'
import {AiOutlineFileAdd} from 'react-icons/ai'

export default function AddCategory({ setOpen }) {

    let user = useContext(UserContext);
    let categoryArr = useContext(CategoryContext);
    let imageRef = useRef(null);
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const handleAdd = async (e) => {
        setLoader(true);
        e.preventDefault();
        let token = await getIdToken(user.user);
        if (name !== "" && image !== null) {
            publicApi.post("/category/create", {
                name: name,
                image: image
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                setName("");
                setImage(null);
                imageRef.current.value = "";
                categoryArr.setFlag(true);
                toast.success("Category Added");
                setLoader(false);
            }).catch(() => {
                toast.error("Server error occured!");
                setLoader(false);
            })
        }
    }

    const handleFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFileBase(file);
    }

    const setFileBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    return (
        <>
            <div className='fixed w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md bg-[white] z-[15]'>
                <div className='w-full flx items-center justify-center'>
                    <img src={popupcat} className='rounded-t-md' alt="" />
                </div>
                <div className='w-full p-8 flex items-center justify-center flex-col'>
                <input value={name} onChange={(e) => {
                    setName(e.target.value);
                }} className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Name' />
                <input ref={imageRef} onChange={handleFile} type="file" className='w-[100%] p-4 mb-[16px] border focus:border focus:outline-2' placeholder='Name' />
                <button onClick={(e) => {
                    if (!loader) {
                        handleAdd(e);
                    }
                }} className="p-2 mt-1 w-full text-xs flex flex-row items-center gap-2 justify-center bg-[#039cd7] text-white rounded-sm"><p>Add</p><AiOutlineFileAdd className="text-white h-4 w-4"></AiOutlineFileAdd></button></div>
            </div>
            <div onClick={() => {
                setOpen(false);
            }} className='fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.4)] z-[14]'></div>
        </>
    )
}
