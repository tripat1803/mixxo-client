import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components";
import { auth } from "../../../Config/firebase";
import { getIdToken } from "firebase/auth";
import { toast } from "react-hot-toast";
import { publicApi } from "../../../Api/Api";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
// import { UserContext } from "../../../Context/AllContext/UserContext";

const Customers = () => {
  // let user = useContext(UserContext);
  const [customers, setCustomers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    total: 1,
  });

  async function fetchCustomers(page) {
    setLoader(true);
    let token = await getIdToken(auth.currentUser);
    publicApi
      .post(
        "/user/all",
        {
          page
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setCustomers(res.data.data);
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
      fetchCustomers(paginate.page);
    }
  }, [auth.currentUser, paginate.page]);

  console.log(paginate);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Customers" buttons={[]} />
        <table className="w-[100%]">
          <thead className="bg-gray-100">
            <tr>
              <td className="p-3 border border-white">Sno.</td>
              <td className="p-3 border border-white">User Name</td>
              <td className="p-3 border border-white">Joined</td>
              <td className="p-3 border border-white">Email</td>
              <td className="p-3 border border-white">Orders</td>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => {
              let details = [
                `${index + 1}.`,
                (!item.lastname) ? item.firstname : (item.firstname + " " + item.lastname),
                new Date(item.createdAt).toDateString(),
                item.email,
                item.total_orders
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
    </>
  );
};
export default Customers;
