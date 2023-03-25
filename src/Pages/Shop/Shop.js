import React from 'react';
import ScreenComponent from '../../Components/ScreenComponent';
import Category from './components/Category';

function Shop(){
    return(
        <ScreenComponent component1={[<Category/>]}/>
    )
}

export default Shop;