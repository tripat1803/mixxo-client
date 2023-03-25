import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { getIdToken } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { publicApi } from "../../../Api/Api";
import { UserContext } from "../../../Context/AllContext/UserContext";

const Field = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function AddDetails() {
  let user = useContext(UserContext);
  const [productArr, setProductArr] = useState([]);
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    async function getAllProducts(){
      publicApi.get("/product/all").then((res) => {
        setProductArr(res.data);
      }).catch((err) => {
        if (err.request.status) {
          return toast.error(err.response.data.message);
        }else{
            toast.error("Something went wrong");
        }
      });
    }
    getAllProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    let token = await getIdToken(user.user);
    if (weight !== "" && price !== 0 && discount !== 0 && productId !== "", shippingPrice !== 0) {
      publicApi.post(
        "/productdetails/add",
        {
          weight: weight,
          price: price,
          discount: discount,
          productId: productId,
          shippingPrice: shippingPrice
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    }
    setWeight("");
    setPrice(0);
    setDiscount(0);
    setProductId("");
    setShippingPrice(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "30%",
        }}
      >
        <Field
          value={weight}
          label="Weight"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        <Field
          value={price}
          type="number"
          label="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Field
          value={discount}
          type="number"
          label="Discount"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
        <Field
          value={shippingPrice}
          type="number"
          label="Shipping Price"
          onChange={(e) => {
            setShippingPrice(e.target.value);
          }}
        />
        <FormControl
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <InputLabel id="product">
            {productArr.length !== 0 ? "Products" : "No Product Added"}
          </InputLabel>
          <Select
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
            }}
            labelId="product"
            id="product"
            label={
              productArr.length !== 0 ? "Products" : "No Product Added"
            }
          >
            {productArr?.map((item, index) => {
              return (
                <MenuItem key={index} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={handleAdd}
          variant="contained"
          sx={{
            width: "100%",
          }}
        >
          ADD
        </Button>
      </Box>
    </Box>
  );
}

export default AddDetails;
