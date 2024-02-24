import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components";
import { auth } from "../../../Config/firebase";
import { getIdToken } from "firebase/auth";
import { toast } from "react-hot-toast";
import { publicApi } from "../../../Api/Api";
import { BiShowAlt, BiEdit, BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Select from "react-select";
import OrderDetailsCard from "../popups/ViewOrderDetails";
import { UserContext } from "../../../Context/AllContext/UserContext";

const Orders = () => {
  const options = [
    { value: "Processing", label: "Processing" },
    { value: "Delivered", label: "Delivered" }
  ];
  let user = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [status, setStatus] = useState("Processing");
  const [paginate, setPaginate] = useState({
    page: 1,
    total: 1,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(false);
  const [reload, setReload] = useState(false);

  const handleDelete = async (id) => {
    let token = await getIdToken(user.user);
    setLoader2(true);
    publicApi
      .post(
        "/order/delete",
        {
          id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        toast.success("Order Deleted");
        setReload(!reload);
        setLoader2(false);
      })
      .catch(() => {
        toast.error("Server Error");
        setLoader2(false);
      });
  };

  async function fetchOrders(page, status) {
    setLoader(true);
    let token = await getIdToken(auth.currentUser);
    publicApi
      .post(
        "/order/all",
        {
          status: status,
          page: page,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setOrders(res.data.data);
          setPaginate((prevdata) => ({ ...prevdata, total: res.data.count }));
        }
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
        toast.error("Server error occured");
      });
  }

  useEffect(() => {
    if (auth.currentUser) {
      fetchOrders(paginate.page, status);
    }
  }, [auth.currentUser, status, paginate.page, reload]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" buttons={[<Select onChange={(e) => {
          setStatus(e.value);
        }} defaultValue={options[0]} options={options} />]} />
        <table className="w-[100%]">
          <thead className="bg-gray-100">
            <tr>
              <td className="p-3 border border-white">Sno.</td>
              <td className="p-3 border border-white">User Name</td>
              <td className="p-3 border border-white">Date</td>
              <td className="p-3 border border-white">Status</td>
              <td className="p-3 border border-white">Details</td>
              <td className="p-3 border border-white">Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              let details = [
                `${index + 1}.`,
                item.user_id.firstname + " " + item.user_id.lastname,
                new Date(item.createdAt).toDateString(),
                item.status,
                <button onClick={() => {
                  setDetails(item);
                  setShowDetails(true);
                }} className="w-full h-full flex items-center justify-start gap-1"><BiShowAlt className="text-green-500 h-6 w-6"></BiShowAlt><p className="text-sm xl:flex hidden text-green-500 font-semibold">Show</p></button>,
                <div className="flex items-center justify-start gap-[8px]">
                  <button
                    disabled={loader2}
                    className="w-full h-full flex items-center justify-start gap-[4px]"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    <AiFillDelete className="text-red-500 h-4 w-4"></AiFillDelete><p className="text-sm xl:flex hidden text-red-500 font-semibold">Delete</p>
                  </button>
                </div>
              ];
              return (
                <tr key={index} className="px-8">
                  {details.map((data, index) => {
                    return <td className="p-3 border" key={index}>{data}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full py-2 flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 py-1">
            <label className="text-sm font-bold">Row:</label>
            <input onChange={(e) => {
              setPaginate((prevData) => ({...prevData, page: Number(e.target.value)}));
            }} type="number" min={1} max={Math.floor(paginate.total/15)} value={paginate.page} className="w-[30px] p-[2px] border border-black bg-gray-200 text-sm outline-none w-[15%] rounded-[1px]" />
          </div>
          <div className="flex flex-row items-center py-1 justify-center gap-2">
            <BiArrowToLeft />
            <BiArrowToRight />
          </div>
        </div>
      </div>
      {showDetails && <OrderDetailsCard item={details} reload={reload} setReload={setReload} setShowDetails={setShowDetails} />}
    </>
  );
};
export default Orders;
