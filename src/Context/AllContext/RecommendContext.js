import React, { createContext, useEffect, useState } from "react";
import { publicApi } from "../../Api/Api";

export const RecommendContext = createContext();

function ProductState({ children }) {
  const [products, setProducts] = useState([]);
  const [productFlag, setProductFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  const [server, setServer] = useState(false);

  async function fetchProducts() {
    setLoader(true);

    publicApi
      .get("/product/group")
      .then((res) => {
        // console.log(res);
        if(res.data){
          setProducts(res.data);
        }
        setLoader(false);
        setServer(false);
      })
      .catch(() => {
        setLoader(false);
        setServer(true);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (productFlag) {
    fetchProducts();
    setProductFlag(false);
  }

  return (
    <RecommendContext.Provider value={{ products, loader, server }}>
      {children}
    </RecommendContext.Provider>
  );
}

export default ProductState;
