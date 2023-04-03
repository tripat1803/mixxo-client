import React from "react";
import CartState from "./AllContext/CartContext";
import CategoryState from "./AllContext/CategoryContext";
import ProductState from "./AllContext/RecommendContext";
import UserState from "./AllContext/UserContext";

function AllState({ children }) {
  return (
    <UserState>
      <CartState>
        <CategoryState>
          <ProductState>
            {children}
          </ProductState>
        </CategoryState>
      </CartState>
    </UserState>
  );
}

export default AllState;
