import React, { createContext, useEffect, useState } from "react";
import { publicApi } from "../../Api/Api";

export const CategoryContext = createContext();

function CategoryState({ children }) {
  const [category, setCategory] = useState([]);
  const [flag, setFlag] = useState(false);
  const [server, setServer] = useState(false);

  const fetchCategories = async () => {
    publicApi.get("/category/all").then((res) => {
      setCategory(res.data);
      setServer(false);
    }).catch(() => {
      setServer(true);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (flag) {
    fetchCategories();
    setFlag(false);
  }

  return (
    <CategoryContext.Provider value={{ category, server, setFlag }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
