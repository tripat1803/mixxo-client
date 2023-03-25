import React, { useLayoutEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ProductCard from '../Components/ProductCard';
import { useState } from 'react';
import { publicApi } from '../../../Api/Api';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CategoryContext } from '../../../Context/AllContext/CategoryContext';
import { useNavigate } from 'react-router-dom';
import ProductDetails from './Popups/ProductDetails';

// const Th = styled("td")(() => ({
//     fontSize: "20px",
//     fontWeight: "600"
// }))

function ViewProduct() {

    let category = useContext(CategoryContext);
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [flag, setFlag] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [categoryArr, setCategoryArr] = useState([]);

    const [details, setDetails] = useState([]);
    const [popup, setPopup] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);

    async function fetchCategoryProducts(currCat, currPg) {
        if (currPg) {
            setLoader(true);
            publicApi.post("/product/category", {
                categoryId: currCat,
                page: currPg,
                limit: 9
            }).then((res) => {
                setData(res.data);
                setLoader(false);
            }).catch(() => {
                setLoader(false);
                alert("Server error");
            });
        }
    }

    useLayoutEffect(() => {
        if (!queryParams.get("page") || !queryParams.get("category") || queryParams.get("category").split(",").length === 0) {
            if (categoryArr.length !== 0) {
                navigate(`/admin?category=${categoryArr[0]._id}&page=1`);
            }
        }
        if (queryParams.get("page") && queryParams.get("category")) {
            fetchCategoryProducts(queryParams.get("category").split(","), queryParams.get("page"));
        }
    }, [queryParams.get("category"), queryParams.get("page")]);

    if (flag) {
        fetchCategoryProducts(queryParams.get("category").split(","), queryParams.get("page"));
        setFlag(false);
    }

    useEffect(() => {
        setCategoryArr(category.category);
    }, [category.category]);

    return (
        <>
            <Box sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "64px 32px"
            }}>
                <Box sx={{
                    width: "60%",
                    display: "flex",
                    gap: "16px"
                }}>
                    <FormControl sx={{
                        width: "100%",
                        marginBottom: "16px"
                    }}>
                        <InputLabel id="categories">{(categoryArr.length !== 0) ? "Categories" : "No Category Added"}</InputLabel>
                        <Select value={categoryId} onChange={(e) => {
                            setCategoryId(e.target.value);
                            navigate(`/admin?category=${e.target.value}&page=1`);
                        }} labelId='categories' id="categories" label={(categoryArr.length !== 0) ? "Categories" : "No Category Added"}>
                            {
                                (categoryArr.length !== 0) && categoryArr.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    flexGrow: "1",
                    width: "85%",
                    padding: "64px 0px",
                    display: "grid",
                    gridTemplateColumns: { md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr", xl: "1fr 1fr 1fr", sm: "1fr 1fr", xs: "1fr" },
                    gap: "64px"
                }}>
                    {
                        data.map((item) => {
                            return (
                                <ProductCard key={item._id} item={item} setPopup={setPopup} setDetails={setDetails} />
                            )
                        })
                    }
                </Box>
            </Box>
            <ProductDetails popup={popup} details={details} setPopup={setPopup} setFlag={setFlag} />
        </>
    );
}

export default ViewProduct;