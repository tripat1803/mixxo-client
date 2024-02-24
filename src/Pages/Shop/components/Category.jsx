import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import Page from './Product';
// import Products from "./Products";
import ProductCard from "../../../Components/ProductCard";
import Pagination from "./Pagination";
import { Box, Button } from "@mui/material";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";
import { publicApi } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Hero2 from "./Hero2";
import Empty from "../../../Components/Empty";
import { toast } from "react-hot-toast";

const Category = () => {
  let navigate = useNavigate();
  const { category } = useContext(CategoryContext);
  const [currCat, setCurrCat] = useState();
  const [currPg, setCurrPg] = useState();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  async function fetchCategoryProducts(currCat, currPg) {
    setLoader(true);
    publicApi.post("/product/category", {
      categoryId: currCat,
      page: currPg
    }).then((res) => {
      setData(res.data);
      setLoader(false);
    }).catch(() => {
      toast.error("Server error");
      setLoader(false);
    })
  }

  useEffect(() => {
    if(!queryParams.get("category") && !queryParams.get("category")?.split(",") && !queryParams.get("page")){
      if(category.length !== 0){
        let data = [];
        category.forEach((item, index) => {
          data.push(item._id);
        })
        navigate(`/shop?category=${data}&page=1`, {
          replace: true
        });
      }
    } else {
      setCurrCat(queryParams.get("category")?.split(","));
      setCurrPg(Number(queryParams.get("page")));
      setFlag(true);
      fetchCategoryProducts(queryParams.get("category").split(","), Number(queryParams.get("page")));
    }
  }, [queryParams.get("page"), queryParams.get("category"), category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(flag){
    setTotal(0);
    setFlag2(true);
    setFlag(false);
  }

  if(flag2){
    if(category.length !== 0){
      category.forEach((item) => {
        if(currCat.includes(String(item?._id))){
          setTotal((prevData) => (prevData + item.number));
        }
      })
    }
    setFlag2(false);
  }

  return (
    <div>
      <Hero2/>
      <div className="py-16">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-1 h-[17vh] mb-[4%] ">
          <Button
            sx={(currCat?.length !== 1) ? {
              height: "3.5rem",
              width: "10.5rem",
              bgcolor: "white",
              borderRadius: "100px",
              border: "2px solid black",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.5s",
              textTransform: "none",
              fontFamily: "Montserrat",
              color: "black",
              ":hover": { bgcolor: "white", color: "black" },
            } : {
              height: "3.5rem",
              width: "10.5rem",
              bgcolor: "black",
              borderRadius: "100px",
              border: "2px solid black",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "all 0.5s",
              textTransform: "none",
              fontFamily: "Montserrat",
              color: "white",
              ":hover": { bgcolor: "white", color: "black" },
            }}
            onClick={() => {
              let cat = [];
              let totalCount = 0;
              category.forEach((item) => {
                cat.push(item._id);
                totalCount += item.number
              });
              navigate(`/shop?category=${cat}&page=${1}`);
              setTotal(totalCount);
            }}
          >
            All
          </Button>

          {category.map((cat) => {
            return (
              <Button
                sx={((currCat) && (currCat[0] === cat._id) && (currCat?.length === 1)) ? {
                  height: "3.5rem",
                  width: "15.5rem",
                  bgcolor: "white",
                  borderRadius: "100px",
                  border: "2px solid black",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.5s",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                  color: "black",
                  ":hover": { bgcolor: "white", color: "black" }
                } : {
                  height: "3.5rem",
                  width: "15.5rem",
                  bgcolor: "black",
                  borderRadius: "100px",
                  border: "2px solid black",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.5s",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                  color: "white",
                  ":hover": { bgcolor: "white", color: "black" }
                }}
                onClick={() => {
                  navigate(`/shop?category=${cat._id}&page=${1}`);
                  setTotal(cat.number);
                }}
                key={cat._id}
              >
                {cat.name}
              </Button>
            );
          })}
        </div>
        <div className="flex justify-center w-full">
          {loader && <Box sx={{
            width: "100%",
            height: "430px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Lottie animationData={require("../../../Assets/Lottie/loader.json")} style={{
              width: "150px"
            }} />
          </Box>}
          {(data.length !== 0) && ((!loader) && <Box sx={(data.length >= 3) ? {
            width: {md: "100%", lg: "90%", xl: "75%", sm: "100%", xs: "100%"},
            display: "grid",
            gridTemplateColumns: {md: "50% 50%", lg: "1fr 1fr 1fr", xl: "1fr 1fr 1fr", sm: "50% 50%", xs: "100%"},
            placeItems: "center",
            gap: "64px 0px"
          } : {
            width: {md: "100%", lg: "90%", xl: "75%", sm: "100%", xs: "100%"},
            display: "grid",
            gridTemplateColumns: {md: "50% 50%", lg: "1fr 1fr", xl: "1fr 1fr", sm: "50% 50%", xs: "100%"},
            placeItems: "center",
            gap: "64px 0px"
          }}>
            {data.map((item) => {
              return (
                <>
                  {
                    (item.details.length !== 0) && <ProductCard key={item._id} id={item._id} productDetails={item.details[0]} title={item.name} imageUrl={item.image[0]?.url} />
                  }
                </>
              );
            })}
          </Box>)}
            {
              (data.length === 0 && !loader) && <Empty message={"No product in this category"} />
            }
        </div>
        <Pagination
          postPerPage={6}
          totalPost={total}
          currCat={currCat}
          currPg={currPg}
        />
      </div>
    </div>
  );
};

export default Category;
