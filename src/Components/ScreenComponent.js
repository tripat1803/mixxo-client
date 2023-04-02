import React from 'react';
import Review from '../Pages/Home/components/Review';
import Header from '../Pages/Home/components/Header';
import Footer from '../Pages/Home/components/Footer';
// import Category from '../Pages/Shop/components/Category';

function ScreenComponent({ component1, component2, background }) {
    return (
        <div style={{
            background
        }}>
            <Header/>
            {component1}
            <Review />
            {component2}
            {/* <Category /> */}
            <Footer/>
        </div>
    )
}

export default ScreenComponent;