import React, { useEffect, useLayoutEffect, useState } from "react";
import { publicApi } from "../../Api/Api";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";
import Page from "./components/Page";

const Product = () => {
  const [data, setData] = useState();
  const [productId, setProductId] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [flag, setFlag] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);

  async function getProduct(id) {
    if (!id) {
      setLoader(false);
    }
    if (id) {
      setLoader(true);
      publicApi
        .get(`/product/get/${id}`)
        .then((res) => {
          setData(res.data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }

  async function getCateoryProducts(catId) {
    if (catId) {
      setLoader2(true);
      publicApi
        .get(`/product/category/${catId}`)
        .then((res) => {
          setCategoryProducts(res.data);
          setLoader2(false);
        })
        .catch(() => {
          setLoader2(false);
        });
    }
  }

  useEffect(() => {
    setProductId(queryParams.get("product"));
    getProduct(queryParams.get("product"));
    getCateoryProducts(queryParams.get("product"));
  }, [queryParams.get("product")]);

  if (flag) {
    setProductId(queryParams.get("product"));
    setFlag(false);
  }

  useLayoutEffect(() => {
    getProduct(queryParams.get("product"));
    getCateoryProducts(queryParams.get("product"));
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!loader || !loader2 ? (
        <>
          {!productId && <Error />}
          {productId && (
            <Page
              data={data}
              id={productId}
              related={categoryProducts}
              setFlag={setFlag}
              loader2={loader2}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Product;
