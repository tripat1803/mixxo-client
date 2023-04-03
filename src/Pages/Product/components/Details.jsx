import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../../Context/AllContext/CartContext";
import { UserContext } from "../../../Context/AllContext/UserContext";
import Faqs from "./Faqs";

function Details({ item, id }) {

  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [loader, setLoader] = useState(false);
  const [productId, setProductId] = useState();

  const [firebaseUser, setFirebaseUser] = useState();
  const notify = () => toast.success("Added To Cart");
  const usernotfound = () => toast.error("Please Sign In");

  useEffect(() => {
    setProductId(id);
  }, [id]);

  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    if (data && data.details) {
      setWeight(data?.details[0]?.productDetailsId?._id);
    }
  }, [data]);

  useEffect(() => {
    setFirebaseUser(user.user);
  }, [user.user]);

  return (
    <>
      <div className="w-full lg:w-[50%] md:py-16 lg:py-0 md:px-10">
        <h1 className="text-3xl font-black"> {data?.name} </h1>
        <div className="flex flex-col space-y-4 py-7 my-2 mb-5 border-y-2 border-black">
          <div className="flex flex-col sm:flex-row gap-3 font-semibold">
            <FormControl sx={{
              border: "1px solid black",
              background: "white",
              width: { md: "208px", lg: "208px", xl: "208px", sm: "100%", xs: "100%" }
            }} focused={false} className="rounded-full">
              <InputLabel sx={{
                fontWeight: "bold",
                color: ""
              }} id='demo'>{!weight ? "Weight" : ""}</InputLabel>
              <Select value={weight} onChange={(e) => {
                setWeight(e.target.value);
              }} labelId="demo" id="demo" label={!weight ? "Weight" : ""} sx={{
                '.MuiOutlinedInput-notchedOutline': { border: 0, outline: 0 },
                textAlign: "center",
                color: "#8b5f4d",
                fontWeight: "600",
                fontFamily: "Cookie",
                fontSize: "20px"
              }}>
                {
                  data?.details?.map((item) => {
                    return (
                      <MenuItem key={item?._id} sx={{
                        textAlign: "center",
                        color: "#8b5f4d",
                        fontFamily: "Cookie",
                        fontSize: "18px"
                      }} value={item?.productDetailsId?._id}>{item?.productDetailsId?.weight}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <button onClick={() => {
              if (firebaseUser) {
                if (productId && weight) {
                  if (!loader) {
                    setLoader(true);
                    cart.updateCart(productId, weight, "PUSH").then(() => {
                      notify();
                      cart.setFlag2(true);
                      setLoader(false);
                    }).catch((err) => {
                      toast.error(err.response.data.message);
                      setLoader(false);
                    });
                  }
                }
              } else {
                usernotfound();
              }
            }} className="w-[100%] sm:w-52 border border-black text-white py-4 bg-primary rounded-full">
              {loader ? (
                <div className="lds-dual-ring"></div>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
          <div>
            {/* <p className="text-md">
              <span className="font-bold">Rating:</span> {data?.rating}
            </p> */}
            <p className="text-md">
              <span className="font-bold">Price:</span> ₹{data?.details?.filter((item) => {
                return item?.productDetailsId?._id === weight
              })[0]?.productDetailsId?.price * quantity}
            </p>
          </div>
        </div>

        {/* div 3 */}
        <div className="flex flex-col space-y-12 break-words">
          <div className="text-md">
            <p>
              <span className="font-bold">
                Are you ready for the hot chocolate of your dreams?
              </span>{" "}
              (pun intended) There’s nothing better than a sweet chocolate treat
              at night to end your day on a high note. But get ready for the bonus
              plan, because this delicious chocolate treat comes with some major
              snooze-town benefits AND it actually tastes good.
            </p>
          </div>

          {/* <div className="text-md">
          <p>
            For some serious night night action, take a fancy to our{" "}
            <b>ultimate </b>
            blend for the perfect wind-down routine:
          </p>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row space-x-1">
              <div>✨</div>
              <div className="font-bold">Caramel</div>
            </div>
            <div className="flex flex-row space-x-1">
              <div>✨</div>
              <div className="font-bold">Coffee Hazelnut</div>
            </div>
          </div>
        </div> */}

          <div>
            <p className="font-bold">Flavour Spotlight: Caramel</p>
            <p>
              Textvuiawbviuawbufino nuwnfuiiuwon nwaouiefncoin oiwaoifoijj Text
              text text textText text text textfbewubybvewiu weiufhuiwehio Text
              text text textText text newiufdcoieh iwhefoi ioewhoifjweoi\ Text
              text text textText text textcewbfiubcinwoiefoi woifehio iwoe Text
              text text textText text text textnfweiunfuinjiscnioefiunjncdjan
              cbewifbiwej bfiwbefij.
            </p>
          </div>

          <div>
            <img src={require("../../../Assets/banner.png")} alt="" />
          </div>
        </div>

        <div className="py-10">
          {/* Mapping here */}
          <Faqs />
          <Faqs />
          <Faqs />
          <Faqs />
        </div>
      </div>
    </>
  );
};

export default Details;
