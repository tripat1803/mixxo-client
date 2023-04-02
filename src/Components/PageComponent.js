import React from 'react';
import HeaderNew from "./HeaderNew";
import Footer from "../Pages/Home/components/Footer";

function PageComponent({component, background}){
    return(
        <div style={{
            background
        }}>
            <HeaderNew/>
            {component}
            <Footer/>
        </div>
    )
}

export default PageComponent;