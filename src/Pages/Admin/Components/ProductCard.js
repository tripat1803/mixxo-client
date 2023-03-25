import { Box, Button, FormControl, InputLabel, Select, styled, Typography } from '@mui/material';
import { getIdToken } from 'firebase/auth';
import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { publicApi } from '../../../Api/Api';
import { UserContext } from '../../../Context/AllContext/UserContext';

const Image = styled("img")(() => ({
    objectFit: "cover",
    height: "50%"
}));

function ProductCard({ item, setPopup, setDetails }){

    let user = useContext(UserContext);
    const [loader, setLoader] = useState(false);

    const handleDelete = async () => {
        if(item._id && item.image){
            let token = await getIdToken(user.user);
            setLoader(true);
            publicApi.post("/product", {
                id: item._id,
                public_id: item.image
            }, {
                headers: {
                    authorization: token
                }
            }).then(() => {
                toast.success("Product Deleted");
                setLoader(false);
            }).catch(() => {
                toast.error("Server Error");
                setLoader(false);
            })
        }
    }

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Image src={item.image[0]?.url} alt='prod-im' />
            <Box sx={{
                width: "100%",
                paddingTop: "8px"
            }}>
                <Box sx={{
                    minHeight: "120px"
                }}>
                    <p className='mb-[8px] text-[150%] font-semibold leading-[100%]'>{item?.name}</p>
                    <p className='mb-[8px]'>{item?.description}</p>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: "16px"
                }}>
                    <Button variant='contained' onClick={() => {
                        if(item.details){
                            setPopup(true);
                            setDetails(item.details);   
                        }
                    }} sx={{
                        width: "100%"
                    }}>Show</Button>
                    <Button onClick={() => {
                        if(!loader){
                            handleDelete();
                        }
                    }} variant='contained' sx={{
                        width: "100%"
                    }}>Delete</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductCard;