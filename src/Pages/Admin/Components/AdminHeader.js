import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const adminNavLinks = [
    {
        name: "Product",
        link: "/admin",
        subLinks: [
            {
                name: "View Product",
                route: "/admin?page=1"
            },
            {
                name: "Add Product",
                route: "/admin/product"
            },
            {
                name: "Add Details",
                route: "/admin/details"
            },
            {
                name: "Add Images",
                route: "/admin/image"
            }
        ]
    },
    {
        name: "Category",
        link: "/admin/category",
        subLinks: []
    },
    {
        name: "Orders",
        link: "/admin/order",
        subLinks: []
    }
];

function NavLinks({ item }) {

    let navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    return (
        <Box onMouseEnter={() => {
            setMenu(true);
        }} onMouseLeave={() => {
            setMenu(false);
        }} sx={{
            position: "relative"
        }}>
            <Typography onClick={() => {
                navigate(item.link);
            }} sx={{
                padding: "8px",
                color: "black",
                fontWeight: "600",
                "&:hover": {
                    cursor: "pointer"
                }
            }}>{item.name}</Typography>
            {
                (item.subLinks.length !== 0 && menu) && <Box sx={{
                    position: "absolute",
                    minWidth: "150px",
                    padding: "8px",
                    right: "0%",
                    background: "black",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    height: "max-content",
                    zIndex: "15",
                    justifyContent: "center"
                }}>
                    {
                        item.subLinks.map((data, index) => {
                            return (
                                <Typography key={`typography_${index}`} onClick={() => {
                                    navigate(data.route);
                                }} sx={{
                                    padding: "8px",
                                    color: "white",
                                    transition: "0.5s",
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "red"
                                    },
                                    height: "max-content"
                                }}>{data.name}</Typography>
                            )
                        })
                    }
                </Box>
            }
        </Box>
    )
}

function AdminHeader() {

    return (
        <AppBar sx={{
            display: "flex",
            background: "#E3C09C",
            position: "static",
            padding: "8px 0px"
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    padding: "8px",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "black"
                }}>Admin</Box>
                <Box sx={{
                    display: "flex",
                    gap: "16px",
                    padding: "0px 16px",
                    alignItems: "center"
                }}>
                    {
                        adminNavLinks.map((item) => {
                            return (
                                <NavLinks key={item.name} item={item} />
                            )
                        })
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AdminHeader;