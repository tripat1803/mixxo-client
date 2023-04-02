import React from 'react';
import HeaderNew from './HeaderNew';
import Footer from "../Pages/Home/components/Footer";

export default function ScreenComponent2({component1, background}) {
    return (
        <div style={{
            background
        }}>
            <HeaderNew/>
            {component1}
            <Footer/>
        </div>
    );
}