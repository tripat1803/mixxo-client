import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { publicApi } from "../../../Api/Api";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";
import { getIdToken } from "firebase/auth";

export default function AddProduct({ setFlag = () => {}, setProduct = () => {} }) {
  let user = useContext(UserContext);
  let categoryArr = useContext(CategoryContext);
  let imageRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    categoryId: "",
    image: null,
  });
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleAdd = async (e) => {
    setLoader(true);
    let token = await getIdToken(user.user);
    if (
      data.name !== "" &&
      data.description !== "" &&
      data.categoryId !== "" &&
      data.image !== null
    ) {
      publicApi
        .post(
          "/product/create",
          {
            ...data,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          setData({
            name: "",
            description: "",
            categoryId: "",
            image: null,
          });
          setProduct(res.data.details);
          imageRef.current.value = "";
          setFlag(true);
          
          toast.success("Product Added");
          setLoader(false);
        })
        .catch(() => {
          toast.error("Server error ocured");
          setLoader(false);
        });
    } else {
      toast.error("Please fill all the fields");
      setLoader(false);
    }
  };

  const handleFile = (e) => {
    e.preventDefault();
    setFileBase(Object.values(e.target.files));
  };

  const setFileBase = (file) => {
    let fileUrls = [];
    file.forEach((item) => {
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onloadend = (e) => {
        fileUrls.push(reader.result);
      };
    });
    setData((prevData) => ({ ...prevData, image: fileUrls }));
  };

  useEffect(() => {
    if (categoryArr.category.length !== 0) {
      let data = [];
      categoryArr.category.forEach((item) => {
        let option = {
          value: String(item._id),
          label: item.name,
        };
        data.push(option);
      });
      setOptions(data);
      setCategory(categoryArr.category);
    }
  }, [categoryArr.category]);

  return (
    <>
    <div className="w-full h-full flex items-center gap-2 justify-center flex-col">
    <div className="w-full p-2 flex items-center justify-center">
      <h1 className="font-bold text-sm text-center">Add Products</h1>
    </div>
      <input
        value={data.name}
        onChange={(e) => {
          setData((prevData) => ({ ...prevData, name: e.target.value }));
        }}
        className="w-[100%] p-4 border focus:border focus:outline-2"
        placeholder="Name"
      />
      <textarea
        value={data.description}
        onChange={(e) => {
          setData((prevData) => ({
            ...prevData,
            description: e.target.value,
          }));
        }}
        className="w-[100%] h-[150px] p-4 border focus:border focus:outline-2"
        placeholder="Description"
      />

      <div className="flex gap-5 w-full items-center">
        <Select
          className="w-[50%]"
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, categoryId: e.value }));
          }}
          placeholder={category.length !== 0 ? "Category" : "No Category added"}
          options={options}
        />
        <input
          ref={imageRef}
          onChange={handleFile}
          type="file"
          multiple
          className="w-[50%] p-4  border focus:border focus:outline-2"
          placeholder="Name"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={loader}
        className="p-2 w-[6rem] rounded-[2px] text-sm bg-[#03C9D7] text-white"
      >
        Add
      </button>
      </div>
    </>
  );
}
