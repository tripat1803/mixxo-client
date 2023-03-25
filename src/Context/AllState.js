import React from "react";
import CartState from "./AllContext/CartContext";
import CategoryState from "./AllContext/CategoryContext";
import ProductState from "./AllContext/RecommendContext";
import UserState from "./AllContext/UserContext";

function AllState({ children }) {
  return (
    <UserState>
      <CartState>
        <ProductState>
          <CategoryState>{children}</CategoryState>
        </ProductState>
      </CartState>
    </UserState>
  );
}

export default AllState;
