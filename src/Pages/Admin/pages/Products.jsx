import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";
import { publicApi } from "../../../Api/Api";
import AddProduct from "../popups/AddProduct";
import PopupTmp from "../popups/PopupTmp";
import ShowProducts from "../popups/ShowProducts";
import { getIdToken } from "@firebase/auth";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { toast } from "react-hot-toast";
import { BiShowAlt,BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import EditProducts from "../popups/EditProducts";


export default function Products() {
  let user = useContext(UserContext);
  let category = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async (id) => {
    let token = await getIdToken(user.user);
    setLoader2(true);
    publicApi
      .post(
        "/product",
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
        toast.success("Product Deleted");
        setLoader2(false);
      })
      .catch(() => {
        toast.error("Server Error");
        setLoader2(false);
      });
  };

  async function fetchCategoryProducts(currCat, currPg) {
    if (currPg) {
      setLoader(true);
      publicApi
        .post("/product/category", {
          categoryId: currCat,
          page: currPg,
          limit: 9,
        })
        .then((res) => {
          setProducts(res.data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
          alert("Server error");
        });
    }
  }

  useEffect(() => {
    let currCat = [];
    category.category.forEach((item) => {
      currCat.push(item._id);
    });
    fetchCategoryProducts(currCat, 1);
  }, [category.category]);

  if (flag) {
    let currCat = [];
    category.category.forEach((item) => {
      currCat.push(item._id);
    });
    fetchCategoryProducts(currCat, 1);
    setFlag(false);
  }

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header
          category="Page"
          title="Products"
          buttons={[
            <button
            className="flex items-center justify-center bg-[#039cd7] text-white p-2 text-sm rounded-md"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Product
            </button>,
          ]}
        />
        <table className="w-[100%]">
          <thead className="bg-gray-100">
            <tr>
              <td className="p-3 border border-white">Sno.</td>
              <td className="p-3 border border-white">Images</td>
              <td className="p-3 border border-white">Name</td>
              <td className="p-3 border border-white">Description</td>
              <td className="p-3 border border-white">Details</td>
              <td className="p-3 border border-white">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              let details = [
                `${index + 1}.`,
                <div className="w-[120px] overflow-hidden">
                  <img
                    className="w-[100%] object-cover"
                    src={item?.image[0]?.url}
                    alt="category"
                  />
                </div>,
                item?.name,
                item?.description,
                <button
                  onClick={() => {
                    setProduct(item);
                    setOpen(true);
                  }}
                  className="w-full h-full flex items-center justify-start gap-1"
                >
                 <BiShowAlt className="text-green-500 h-6 w-6"></BiShowAlt><p className="text-sm text-green-500 font-semibold">Show</p>
                </button>,
                <div className="flex items-center justify-start gap-[8px]">
                  <button onClick={() => {
                    setProduct(item);
                    setOpenEdit(true);
                  }} className="w-full h-full flex items-center justify-start gap-[4px]"><BiEdit className="text-yellow-500 h-4 w-4"></BiEdit><p className="text-sm xl:flex hidden text-yellow-500 font-semibold">Edit</p></button>
                  <button
                  className="w-full h-full flex items-center justify-start gap-[4px]"
                    disabled={loader2}
                    onClick={() => {
                      handleDelete(item._id);
                      setProducts(
                        products.filter((dataa) => {
                          return dataa._id !== item._id;
                        })
                      );
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
      </div>
      {open && (
        <PopupTmp setOpen={setOpen} setProduct={setProduct}>
          {product === "" ? (
            <AddProduct setProduct={setProduct} setFlag={setFlag} />
          ) : (
            <ShowProducts product={product} setFlag={setFlag} />
          )}
        </PopupTmp>
      )}
      {openEdit && <EditProducts product={product} setOpenEdit={setOpenEdit} setFlag={setFlag} />}
    </>
  );
}
