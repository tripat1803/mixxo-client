import React, { useState, useReducer, useContext, useEffect } from 'react';
import { Box, TextField, styled, FormControl, TextareaAutosize, FormLabel, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { productReducer } from './Reducers/ProductReducer';
import { publicApi } from '../../../Api/Api';
import { UserContext } from "../../../Context/AllContext/UserContext";
import { getIdToken } from 'firebase/auth';
import { CategoryContext } from '../../../Context/AllContext/CategoryContext';

const Field = styled(TextField)(() => ({
    width: "100%",
    marginBottom: "16px"
}));

const initialData = {
    name: "",
    description: "",
    categoryId: ""
}

function AddProduct() {

    let user = useContext(UserContext);
    let categoryArr = useContext(CategoryContext);
    const [data, dispatch] = useReducer(productReducer, initialData);
    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleAdd = async (e) => {
        setLoader(true);
        let token = await getIdToken(user.user);
        if(data.name !== "" && data.description !== "" && data.categoryId !== ""){
            publicApi.post("/product/create", {
                ...data
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                dispatch({ type: "CLEAR" });
                setLoader(false);
            }).catch(() => {
                setLoader(false);
            });
        }
    }

    useEffect(() => {
        setCategory(categoryArr.category)
    }, [categoryArr.category])

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}>
            <Box sx={{
                width: "30%",
                padding: "32px"
            }}>
                <Field value={data.name} label="Name" onChange={(e) => {
                    dispatch({
                        type: "NAME",
                        payload: {
                            data: e.target.value
                        }
                    });
                }} />
                <FormControl sx={{
                    width: "100%",
                    marginBottom: "16px"
                }}>
                    <FormLabel>Description</FormLabel>
                    <TextareaAutosize value={data.description} onChange={(e) => {
                        dispatch({
                            type: "DESCRIPTION",
                            payload: {
                                data: e.target.value
                            }
                        });
                    }} style={{
                        height: "150px",
                        padding: "16px"
                    }} />
                </FormControl>
                <FormControl sx={{
                    width: "100%",
                    marginBottom: "16px"
                }}>
                    <InputLabel id="categories">{(category.length !== 0) ? "Categories" : "No Category Added"}</InputLabel>
                    <Select value={data.categoryId} onChange={(e) => {
                        dispatch({
                            type: "CATEGORIES",
                            payload: {
                                data: e.target.value
                            }
                        });
                    }} labelId='categories' id="categories" label={(category.length !== 0) ? "Categories" : "No Category Added"}>
                        {
                            (category.length !== 0) && category.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={String(item._id)}>{item.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
                <Button onClick={() => {
                    if(!loader){
                        handleAdd();
                    }
                }} variant='contained' sx={{
                    width: "100%"
                }}>ADD</Button>
            </Box>
        </Box>
    );
}

export default AddProduct;