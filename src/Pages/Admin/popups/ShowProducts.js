import { getIdToken } from "@firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { publicApi } from "../../../Api/Api";
import { toast } from "react-hot-toast";
import { MdOutlineSaveAlt } from 'react-icons/md';
import { AiFillDelete, AiOutlineFileAdd } from 'react-icons/ai';

export default function ShowProducts({ product, setFlag }) {
  let user = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({
    weight: "",
    price: 0,
    discount: 0,
    shippingPrice: 0
  })
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const handleAdd = async (e, Id) => {
    e.preventDefault();
    let token = await getIdToken(user.user);
    if (details.weight !== "" && details.price !== 0 && details.discount !== 0 && Id && Id !== "" && details.shippingPrice !== 0) {
      setLoader(true);
      publicApi.post(
        "/productdetails/add",
        {
          weight: details.weight,
          price: details.price,
          discount: details.discount,
          productId: Id,
          shippingPrice: details.shippingPrice
        },
        {
          headers: {
            authorization: token,
          },
        }
      ).then((res) => {
        setDetails({
          weight: "",
          price: 0,
          discount: 0,
          shippingPrice: 0
        });
        setFlag(true);
        setData((prevData) => [...prevData, { productDetailsId: res.data }]);
        toast.success("Details Added");
        setLoader(false);
      }).catch(() => {
        toast.error("Error adding Details");
        setLoader(false);
      });
    }
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    if (id) {
      setLoader2(true);
      let token = await getIdToken(user.user);
      publicApi.delete(`/productdetails/${id}`, {
        headers: {
          authorization: token
        }
      }).then(() => {
        toast.success("Details deleted");
        setFlag(true);
        setData(data.filter((item) => {
          return item.productDetailsId._id !== id;
        }));
        setLoader2(false);
      }).catch(() => {
        toast.error("Server error occured");
        setLoader2(false);
      })
    }
  }

  useEffect(() => {
    setData(product.details);
  }, [product]);

  return (
    <div className="">
      <div className="flex  items-center justify-center pb-4">
        <p className="text-2xl font-semibold">Details</p>
      </div>
      <div className="flex items-center justify-center gap-2 flex-col lg:flex-row">
        <div className="p-1 flex items-center justify-center "><img src={product.image[0]?.url} className="aspect-square object-cover  rounded-md h-44 w-44" /></div>
        <div className="p-1 flex items-center justify-start gap-2 flex-col">
          <div className="text-lg font-medium w-full">Name: <span className="font-normal text-base">{product.name}</span></div>
          <div className="text-lg font-medium w-full">Description: <span className="font-normal text-base">{product.description}</span></div>
          <div className="text-lg font-medium w-full">Category: <span className="font-normal text-base">{product.category}</span></div>
          <div className="flex flex-row w-full items-center justify-start gap-3">
            <button
              className="p-2 mt-1 w-[33%] text-xs flex flex-row items-center gap-2 justify-center bg-[#039cd7] text-white rounded-sm"
              onClick={() => {
                setShow(!show);
              }}
            >
              <p>Add</p><AiOutlineFileAdd className="text-white h-4 w-4"></AiOutlineFileAdd>
            </button>
          </div>
        </div>
      </div>

      {show && (
        <div className="flex flex-col items-center justify-center p-2 py-4">
          <div className="flex  items-center justify-center pb-4">
            <p className="text-xl font-semibold">Additional Details</p>
          </div>
          <div className="flex gap-3 w-full">
            <input
              value={details.weight}
              onChange={(e) => {
                setDetails((prevData) => ({ ...prevData, weight: e.target.value }));
              }}
              className="w-[50%] p-4 mb-[16px] border focus:border focus:outline-2"
              placeholder="Weight"
            />
            <input
              value={details.price}
              onChange={(e) => {
                setDetails((prevData) => ({ ...prevData, price: e.target.value }));
              }}
              type="number"
              className="w-[50%] p-4 mb-[16px] border focus:border focus:outline-2"
              placeholder="Price"
            />
          </div>
          <div className="flex gap-3 w-full">
            <input
              value={details.discount}
              onChange={(e) => {
                setDetails((prevData) => ({ ...prevData, discount: e.target.value }));
              }}
              type="number"
              className="w-[100%] p-4 mb-[16px] border focus:border focus:outline-2"
              placeholder="Discount"
            />
            <input
              value={details.shippingPrice}
              onChange={(e) => {
                setDetails((prevData) => ({ ...prevData, shippingPrice: e.target.value }));
              }}
              type="number"
              className="w-[100%] p-4 mb-[16px] border focus:border focus:outline-2"
              placeholder="Shipping Price"
            />
          </div>
          <button
            className="p-2 mt-1 w-[33%] text-xs flex flex-row items-center gap-2 justify-center bg-[#039cd7] text-white rounded-sm"
            disabled={loader}
            onClick={(e) => {
              setShow(false);
              handleAdd(e, product._id);
            }}
          >
            <p>Save</p><MdOutlineSaveAlt className="text-white h-4 w-4"></MdOutlineSaveAlt>
          </button>
        </div>
      )}
      {data.map((item) => {
        return (
          <div className="flex items-center justify-center my-4">
            <table className="w-[100%] bg-gray-50">
              <thead className="bg-gray-100">
                <tr>
                  <td className="p-3 border ">Weight</td>
                  <td className="p-3 border ">Price</td>
                  <td className="p-3 border ">Discount</td>
                  <td className="p-3 border ">Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr className="px-8">
                  <td className="p-3 border">{item.productDetailsId.weight}</td>
                  <td className="p-3 border">{item.productDetailsId.price}</td>
                  <td className="p-3 border">{item.productDetailsId.discount}</td>
                  <td className="p-3 border"><button disabled={loader2} onClick={(e) => {
                    handleDelete(e, item.productDetailsId._id);
                  }} className="w-full h-full flex gap-1 items-center"><AiFillDelete className="text-red-500 h-4 w-4"></AiFillDelete><p className="text-sm xl:flex hidden text-red-500 font-semibold">Delete</p></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
