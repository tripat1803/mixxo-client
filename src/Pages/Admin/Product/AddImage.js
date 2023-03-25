import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getIdToken } from "firebase/auth";
import React, { useContext, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { publicApi } from "../../../Api/Api";
import { UserContext } from "../../../Context/AllContext/UserContext";

function AddImage() {
  let imageRef = useRef(null);
  let user = useContext(UserContext);
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState("");
  const [productArr, setProductArr] = useState([]);

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileBase(file);
  };

  const setFileBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let token = await getIdToken(user.user);
    if (productId !== "" && image !== "") {
      publicApi
        .post(
          "/product/upload",
          {
            productId: productId,
            image: image,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then(() => {
          imageRef.current.value = "";
          setProductId("");
          setImage("");
        }).catch((err) => {
          if (err.request.status) {
            return toast.error(err.response.data.message);
          }else{
              toast.error("Something went wrong");
          }
        });
    }
  };

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
          padding: "32px",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <InputLabel id="categories">
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
            {productArr.length !== 0 &&
              productArr.map((item, index) => {
                return (
                  <MenuItem key={index} value={String(item._id)}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <FormLabel
            sx={{
              marginBottom: "8px",
            }}
          >
            Select Images
          </FormLabel>
          <input ref={imageRef} onChange={handleFile} type="file" />
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

export default AddImage;
