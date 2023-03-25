import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';
import { getIdToken } from 'firebase/auth';
import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { publicApi } from '../../../Api/Api';
import { CategoryContext } from '../../../Context/AllContext/CategoryContext';
import { UserContext } from '../../../Context/AllContext/UserContext';

const Field = styled(TextField)(() => ({
    width: "100%",
    marginBottom: "16px"
}));

function AddCategory(){

    let user = useContext(UserContext);
    let categoryArr = useContext(CategoryContext);
    let imageRef = useRef(null);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
        let token = await getIdToken(user.user);
        if(name !== "" && image !== null){
            publicApi.post("/category/create", {
                name: name,
                image: image
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                setName("");
                setImage(null);
                imageRef.current.value = "";
                categoryArr.setFlag(true);
                toast.success("Category Added");
            }).catch(() => {
                toast.error("Server error occured!");
            })
        }
    }
    
    const handleDelete = async (e) => {
        e.preventDefault();
        let token = await getIdToken(user.user);
        if(categoryId !== ""){
            publicApi.get(`/category/${categoryId}`, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                setCategoryId("");
                categoryArr.setFlag(true);
                toast.success("Category deleted");
            }).catch(() => {
                toast.error("Server error occured!");
            })
        }
    }

    const handleFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFileBase(file);
    }

    const setFileBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    useEffect(() => {
        setCategory(categoryArr.category)
    }, [categoryArr.category])

    return(
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px"
        }}>
            <Box sx={{
                width: "30%"
            }}>
                <Field value={name} label="Name" onChange={(e) => {
                    setName(e.target.value);
                }} />
                <FormControl sx={{
                    width: "100%",
                    marginBottom: "16px"
                }}>
                    <FormLabel sx={{
                        marginBottom: "8px"
                    }}>Select Images</FormLabel>
                    <input ref={imageRef} onChange={handleFile} type="file" />
                </FormControl>
                <Button onClick={handleAdd} variant='contained' sx={{
                    width: "100%"
                }}>Add</Button>
            </Box>
            <Box sx={{
                width: "30%"
            }}>
                <FormControl sx={{
                    width: "100%",
                    marginBottom: "16px"
                }}>
                    <InputLabel id="categories">{(category.length !== 0) ? "Categories" : "No Category Added"}</InputLabel>
                    <Select value={categoryId} onChange={(e) => {
                        setCategoryId(e.target.value);
                    }} labelId='categories' id="categories" label={(category.length !== 0) ? "Categories" : "No Category Added"}>
                        {
                            (category.length !== 0) && category.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
                <Button onClick={handleDelete} variant='contained' sx={{
                    width: "100%"
                }}>Delete</Button>
            </Box>
        </Box>
    )
}

export default AddCategory;