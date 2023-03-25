import styled from '@emotion/styled';
import { Box, FormControl, IconButton, MenuItem, Select, Typography } from '@mui/material'
import { getIdToken } from 'firebase/auth';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { publicApi } from '../../../Api/Api';
import { UserContext } from '../../../Context/AllContext/UserContext';
import OrderDetails from './Popups/OrderDetails';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const Th = styled("td")(() => ({
    fontSize: "20px",
    fontWeight: "600",
    padding: "16px"
}))

const Td = styled("td")(() => ({
    fontSize: "16px",
    padding: "10px"
}))

const PageBtn = styled(Box)(() => ({
    padding: "0px 8px"
}))

function paginateArray(total) {
    let arr = [];
    for (let i = 1; i <= total; i++) {
        arr.push(i);
    }
    return arr;
}


function ViewOrder() {

    let user = useContext(UserContext);
    let navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState({});
    const [popup, setPopup] = useState(false);
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState('Processing');
    const [paginate, setPaginate] = useState({
        page: 1,
        total: 1
    });

    const headings = ["S.no.", "Name", "Ordered", "Status", "Details"];
    const queryparams = new URLSearchParams(window.location.search);

    async function fetchOrders(page) {
        setLoader(true);
        let token = await getIdToken(user.user);
        publicApi.post("/order/all", {
            status: status,
            page: page
        }, {
            headers: {
                authorization: token
            }
        }).then((res) => {
            if (res.data) {
                setOrders(res.data.data);
                setPaginate((prevdata) => ({ ...prevdata, total: res.data.count }));
            }
            setLoader(false);
        }).catch(() => {
            setLoader(false);
            toast.error("Server error occured");
        })
    }

    // useEffect(() => {
    //     fetchOrders();
    // }, []);

    useEffect(() => {
        if (!queryparams.get("page")) {
            navigate("/admin/order?page=1");
        }
        if (queryparams.get("page")) {
            fetchOrders(queryparams.get("page"));
            setPaginate((prevdata) => ({...prevdata, page: Number(queryparams.get("page"))}))
        }
    }, [queryparams.get("page"), status]);

    return (
        <>
            <Box sx={{
                padding: "32px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Box sx={{
                    padding: "16px 0px",
                    width: "70%",
                    display: "flex",
                    justifyContent: "right"
                }}>
                    <FormControl sx={{
                        width: "200px",
                    }}>
                        <Select value={status} onChange={async (e) => {
                            if (!loader) {
                                setStatus(e.target.value);
                            }
                        }} sx={{
                            height: "50px"
                        }}>
                            <MenuItem value={"Processing"}>Processing</MenuItem>
                            <MenuItem value={"Delivered"}>Delivered</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    width: "70%",
                    border: "3px solid #C07E49",
                    borderRadius: "12px",
                    overflow: "hidden",
                    minHeight: "700px",
                    background: "#FFF8EF",
                    display: "flex",
                    flexDirection: "column"
                    // padding: "16px 0px"
                }}>
                    <Box sx={{
                        flexGrow: "1"
                    }}>
                        <table style={{
                            width: "100%"
                        }}>
                            <thead style={{
                                borderBottom: "3px solid #C07E49",
                            }}>
                                <tr>
                                    {
                                        headings.map((item) => {
                                            return (
                                                <Th key={item._id}>{item}</Th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((item, index) => {
                                        let details = [
                                            `${index + 1}.`,
                                            item.user_id.firstname + " " + item.user_id.lastname,
                                            new Date(item.createdAt).toDateString(),
                                            item.status,
                                            <button onClick={() => {
                                                setDetails(item);
                                                setPopup(true);
                                            }}>Show</button>
                                        ];
                                        return (
                                            <tr key={item.user_id._id}>
                                                {
                                                    details.map((dataa, index) => {
                                                        return (
                                                            <Td key={index}>{dataa}</Td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Box>
                    <Box sx={{
                        borderTop: "3px solid #C07E49",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            display: "flex",
                            gap: "8px"
                        }}>
                            <IconButton onClick={() => {
                                if(!loader){
                                    if(paginate.page !== 1){
                                        navigate(`/admin/order?page=${Number(paginate.page)-1}`);
                                    }
                                }
                            }}><ArrowBackIosNewIcon /></IconButton>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                {
                                    paginateArray(paginate.total).map((item, index) => {
                                        return (
                                            <Box key={`box_${index}`} sx={{
                                                display: "flex"
                                            }}>
                                                {
                                                    (index === 0) && <PageBtn>
                                                        {item}
                                                    </PageBtn>
                                                }
                                                {
                                                    (item === paginate.page && index !== 1 && index !== 0) && <PageBtn>...</PageBtn>
                                                }
                                                {
                                                    (item === paginate.page && index !== 0 && index !== paginate.total-1) && <PageBtn>
                                                        {item}
                                                    </PageBtn>
                                                }
                                                {
                                                    (item === paginate.page && index !== paginate.total-1 && index !== paginate.total-2) && <PageBtn>...</PageBtn>
                                                }
                                                {
                                                    (index === paginate.total-1 && paginate.total !== 1) && <PageBtn>
                                                        {item}
                                                    </PageBtn>
                                                }
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                            <IconButton onClick={() => {
                                if(!loader){
                                    if(paginate.page !== paginate.total){
                                        navigate(`/admin/order?page=${++paginate.page}`);
                                    }
                                }
                            }}><ArrowForwardIosIcon /></IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <OrderDetails popup={popup} details={[details]} setPopup={setPopup} />
        </>
    );
}

export default ViewOrder;