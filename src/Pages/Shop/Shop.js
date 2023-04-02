import React from 'react';
import Category from './components/Category';
import ScreenComponent2 from '../../Components/ScreenComponent2';

function Shop(){
    return(
        <ScreenComponent2 component1={[<Category/>]}/>
    )
}

export default Shop;