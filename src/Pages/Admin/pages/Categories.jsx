import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";
import AddCategory from "../popups/AddCategory";
import { publicApi } from "../../../Api/Api";
import { getIdToken } from "@firebase/auth";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../Context/AllContext/UserContext";
import {AiFillDelete} from "react-icons/ai"

const Categories = () => {
  let user = useContext(UserContext);
  let category = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleDelete = async (e, categoryId) => {
    let token = await getIdToken(user.user);
    if (categoryId !== "") {
      setLoader(true);
      publicApi.get(`/category/${categoryId}`, {
        headers: {
          authorization: token
        }
      }).then(() => {
        category.setFlag(true);
        toast.success("Category deleted");
        setLoader(false);
      }).catch((err) => {
        if(err.response.data.message){
          toast.error(err.response.data.message);
        } else {
          toast.error("Server error occured!");
        }
        setLoader(false);
      })
    }
  }

  useEffect(() => {
    setCategories(category.category);
  }, [category.category]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header
          category="Page"
          title="Categories"
          buttons={[
            <button
             className="flex items-center justify-center bg-[#039cd7] text-white p-2 text-sm rounded-md"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Category
            </button>,
          ]}
        />
        <div>
          <table className="w-[100%]">
            <thead className="bg-gray-100">
              <tr>
                <td className="p-3 border border-white">S.No</td>
                <td className="p-3 border border-white">Image</td>
                <td className="p-3 border border-white">Name</td>
                <td className="p-3 border border-white">Products</td>
                <td className="p-3 border border-white">Actions</td>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => {
                let details = [
                  `${index + 1}.`,
                  <img
                    className="w-[200px]"
                    src={item.image.url}
                    alt="category"
                  />,
                  item.name,
                  item.number,
                  <div className="flex gap-4">
                    <button disabled={loader}  className="w-full h-full flex items-center justify-start gap-[4px]" onClick={(e) => {
                      handleDelete(e, item._id);
                    }}> <AiFillDelete className="text-red-500 h-4 w-4"></AiFillDelete><p className="text-sm xl:flex hidden text-red-500 font-semibold">Delete</p>
                    </button>
                  </div>,
                ];
                return (
                  <tr key={index}>
                    {details.map((data, index) => {
                      return <td className="p-3 border" key={index}>{data}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {open && <AddCategory setOpen={setOpen} />}
    </>
  );
};
export default Categories;
