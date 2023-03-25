import { Box } from '@mui/material';
import React from 'react';
import Review from '../Pages/Home/components/Review';
// import Category from '../Pages/Shop/components/Category';

function ScreenComponent({ component1, component2 }) {
    return (
        <>
            {component1}
            <Review />
            {component2}
            {/* <Category /> */}
        </>
    )
}

export default ScreenComponent;