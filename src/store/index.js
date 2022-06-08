import { configureStore } from "@reduxjs/toolkit";
import isLoading from "./slices/isLoading.Slice";
import products from "./slices/products.slices";
import purchases from "./slices/purchases.slices";
import cart from "./slices/cart.slice";

export default configureStore({
  reducer: {
    isLoading,
    products,
    purchases,
    cart,
  },
});
