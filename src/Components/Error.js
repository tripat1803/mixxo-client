import { Box } from '@mui/material';
import React from 'react';
import Lottie from "lottie-react";

function Error(){
    return(
        <Box sx={{
            background: "#FEBB8A"
        }}>
            <Lottie style={{
                width: "100vw",
                height: "100vh"
            }} animationData={require("../Assets/Lottie/error.json")} />
        </Box>
    )
}

export default Error;