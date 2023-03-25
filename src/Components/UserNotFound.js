import { Box } from '@mui/material';
import React from 'react';

function UserNotFound(){
    return(
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{
                padding: "32px",
                fontSize: "20px",
            }}>
                Please Sign In
            </Box>
        </Box>
    )
}

export default UserNotFound;