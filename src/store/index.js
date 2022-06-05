import { configureStore } from "@reduxjs/toolkit";
import isLoading from "./slices/isLoading.Slice";
import products from "./slices/products.slices";

export default configureStore({
  reducer: {
    isLoading,
    products,
  },
});
