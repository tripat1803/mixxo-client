import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../Components/Error";
import { UserContext } from "../Context/AllContext/UserContext";
import AddCategory from "../Pages/Admin/Category/AddCategory";
import AdminHeader from "../Pages/Admin/Components/AdminHeader";
import ViewOrder from "../Pages/Admin/Orders/ViewOrder";
import AddDetails from "../Pages/Admin/Product/AddDetails";
import AddImage from "../Pages/Admin/Product/AddImage";
import AddProduct from "../Pages/Admin/Product/AddProduct";
import ViewProduct from "../Pages/Admin/Product/ViewProduct";

const theme = createTheme({
  palette: {
    primary: { 500: "#C07E49" },
  },
});

function AdminRoutes() {
  let user = useContext(UserContext);
  if (user.mongoUser?.role === "admin") {
    return (
      <ThemeProvider theme={theme}>
        <AdminHeader />
        <Routes>
          <Route path="/" element={<ViewProduct />} />
          <Route path="/product" element={<AddProduct />} />
          <Route path="/details" element={<AddDetails />} />
          <Route path="/image" element={<AddImage />} />
          <Route path="/category" element={<AddCategory />} />
          <Route path="/order" element={<ViewOrder />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    );
  } else return <Error />;
}

export default AdminRoutes;
