import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsloading } from "./isLoading.Slice";

export const products = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = products.actions;

export const getProducts = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsloading(false)));
};

export const filterHeadline = (query) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${query}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsloading(false)));
};

export const filterCategory = (id) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsloading(false)));
};

export default products.reducer;
