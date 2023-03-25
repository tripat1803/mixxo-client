import { Box, TextField, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/AllContext/UserContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import { publicApi } from '../../../Api/Api';
import { getIdToken } from 'firebase/auth';
import Lottie from "lottie-react";
import AccountPopup from './Popups/AccountPopup';

const options = [
    "Set as default",
    "Delete"
];

const options2 = [
    "Delete"
];

function Field({ flag, value, setValue }) {
    return (
        <>
            {
                <TextField disabled={!flag} sx={{
                    width: "100%"
                }} value={(value !== "Empty") ? value : ""} onChange={(e) => {
                    setValue(e.target.value);
                }} />
            }
        </>
    )
}

function ShippingCard({ id, address, mobile, city, defaultBool, setDetailsFlag }) {
    let user = useContext(UserContext);
    const [firebaseUser, setFirebaseUser] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [loader, setLoader] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (e) => {
        let token = await getIdToken(firebaseUser);
        if (String(e.target.innerText) === "Set as default") {
            if (token) {
                setLoader(true);
                publicApi.get(`/shipping/set/${id}`, {
                    headers: {
                        authorization: token
                    }
                }).then(() => {
                    user.setMongoFlag(true);
                    setDetailsFlag(true);
                    setAnchorEl(null);
                    setLoader(false);
                }).catch(() => {
                    setLoader(false);
                })
            }
        } else if (String(e.target.innerText) === "Delete") {
            if (token) {
                setLoader(true);
                publicApi.get(`/shipping/remove/${id}`, {
                    headers: {
                        authorization: token
                    }
                }).then(() => {
                    user.setMongoFlag(true);
                    setDetailsFlag(true);
                    setAnchorEl(null);
                    setLoader(false);
                }).catch(() => {
                    setLoader(false);
                })
            }
        } else {
            setAnchorEl(null);
        }
    };

    useEffect(() => {
        setFirebaseUser(user.user);
    }, [user.user]);

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "column", lg: "column", xl: "row", xs: "column", sm: "column" },
            gap: "16px",
            margin: "8px"
        }}>
            <Box sx={(defaultBool) ? {
                width: "100%",
                borderRadius: "20px",
                border: "1px solid black",
                padding: "16px",
                display: "flex",
                overflow: "hidden",
                background: "white"
            } : {
                width: "100%",
                borderRadius: "20px",
                border: "1px solid black",
                padding: "16px",
                display: "flex",
                overflow: "hidden",
                background: "transparent"
            }}>
                <Box sx={{
                    flexGrow: "1"
                }}>
                    <Box sx={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <Typography sx={{
                            width: "70px"
                        }}>Address:</Typography>
                        <Typography sx={{
                            display: { md: "none", lg: "none", xl: "none", sm: "none", xs: "block" }
                        }}>{address?.substring(0, 15)}<span style={{ opacity: "0.3" }}>{address?.substring(15, 20)}...</span></Typography>
                        <Typography sx={{
                            display: { md: "block", lg: "block", xl: "block", sm: "block", xs: "none" }
                        }}>{address?.substring(0, 60)}<span style={{ opacity: "0.3" }}>{address?.substring(60, 65)}{(address?.length >= 65) && "..."}</span></Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <Typography sx={{
                            width: "70px"
                        }}>Mobile:</Typography>
                        <Typography>{mobile}</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <Typography sx={{
                            width: "70px"
                        }}>City:</Typography>
                        <Typography>{city}</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon fontSize='small' />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {(defaultBool) ? options2.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        )) : options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}

function Account() {

    let user = useContext(UserContext);
    const [mongoUser, setMongoUser] = useState({});
    const [shippingDetails, setShippingDetails] = useState([]);
    const [editAccount, setEditAccount] = useState(false);
    const [loader, setLoader] = useState(false);
    const [popup, setPopup] = useState(false);
    const [detailsFlag, setDetailsFlag] = useState(false);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user.mongoUser) {
            setMongoUser(user.mongoUser);
            setFirstname(user.mongoUser.firstname);
            setLastname(user.mongoUser.lastname);
            setEmail(user.mongoUser.email);
            setShippingDetails(user.mongoUser.shippingInfo);
        }
    }, [user.mongoUser]);

    if (detailsFlag) {
        setMongoUser(user.mongoUser);
        setFirstname(user.mongoUser.firstname);
        setLastname(user.mongoUser.lastname);
        setEmail(user.mongoUser.email);
        setShippingDetails(user.mongoUser.shippingInfo);
        setDetailsFlag(false);
    }

    const handleSave = async (e) => {
        let token = await getIdToken(user.user);
        if (token) {
            if (firstname !== "" && email !== "") {
                setLoader(true);
                publicApi.post("/user/update", {
                    firstname: firstname,
                    lastname: lastname
                }, {
                    headers: {
                        authorization: token
                    }
                }).then(() => {
                    setEditAccount(false);
                    user.setMongoFlag(true);
                    setLoader(false);
                }).catch(() => {
                    setLoader(false);
                })
            }
        }
    }

    return (
        <>
            <Box sx={{
                borderRadius: "20px",
                background: "#FAE0BF",
                width: "100%",
                padding: { md: "32px", lg: "32px", xl: "32px", sm: "24px", xs: "8px" }
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    {
                        loader && <Box sx={{
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Lottie style={{
                                width: "100px",
                                height: "100px"
                            }} animationData={require("../../../Assets/Lottie/loader.json")} />
                        </Box>
                    }
                    {
                        !loader && <Box sx={{
                            display: "flex",
                            width: "70%",
                            alignItems: "center"
                        }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: "1"
                            }}>
                                <Typography sx={{
                                    fontSize: "20px",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    height: "max-content"
                                }}>Account Details</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center"
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <CreateIcon sx={{
                                        "&:hover": {
                                            cursor: "pointer"
                                        }
                                    }} onClick={() => {
                                        setEditAccount(!editAccount);
                                    }} />
                                    {/* <Button variant='contained'>Add</Button> */}
                                </Box>
                            </Box>
                        </Box>
                    }
                    {!loader && <Box sx={{
                        display: "grid",
                        width: "70%",
                        gridTemplateColumns: {md: "1fr 1fr", lg: "1fr 1fr", xl: "1fr 1fr", sm: "1fr", xs: "1fr"},
                        gap: "16px"
                    }}>
                        <Box>
                            <p>Firstname:</p>
                            <Field flag={editAccount} value={firstname} setValue={setFirstname} />
                        </Box>
                        <Box>
                            <p>Lastname:</p>
                            <Field flag={editAccount} value={(lastname !== "" && lastname) ? lastname : "Empty"} setValue={setLastname} />
                        </Box>
                    </Box>}
                    {(editAccount) && <Box sx={{
                        width: "70%",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                        padding: "8px 0px",
                        marginTop: "16px"
                    }}>
                        <Button sx={{
                            background: "#C07E49",
                            "&:hover": {
                                background: "#C07E49",
                            }
                        }} onClick={(e) => {
                            if (!loader) {
                                handleSave(e);
                            }
                        }} variant='contained'>Save</Button>
                    </Box>}
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        width: { md: "70%", lg: "70%", xl: "70%", sm: "70%", xs: "90%" },
                        padding: "24px 0px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Typography sx={{
                                fontSize: "20px",
                                marginBottom: "16px",
                                padding: "8px"
                            }}>Shipping Details</Typography>
                            <Button sx={{
                                background: "#C07E49",
                                "&:hover": {
                                    background: "#C07E49",
                                }
                            }} onClick={() => {
                                setPopup(true);
                            }} variant='contained'>Add</Button>
                        </Box>
                        {
                            (shippingDetails && shippingDetails.length !== 0) && shippingDetails.map((item) => {
                                return (
                                    <ShippingCard key={item._id} defaultBool={item?.shippingId?.default} id={item?.shippingId?._id} address={item?.shippingId?.address} city={item?.shippingId?.city} mobile={item?.shippingId?.mobile} setDetailsFlag={setDetailsFlag} />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
            {popup && <AccountPopup bool={popup} setBool={setPopup} setDetailsFlag={setDetailsFlag} />}
        </>
    )
}

export default Account;