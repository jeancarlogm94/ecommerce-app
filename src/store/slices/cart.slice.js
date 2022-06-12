import { createSlice } from "@reduxjs/toolkit";
import getConfig from "../../utils/getConfig";
import axios from "axios";
import { setIsloading } from "./isLoading.Slice";
import { getPurchases } from "./purchases.slices";

export const mySlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCart } = mySlice.actions;

export const getCart = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsloading(false)));
};

export const addToCart = (cart) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      cart,
      getConfig()
    )
    .catch((error) => console.log(error.response))
    .then(() => dispatch(getCart()))
    .finally(() => dispatch(setIsloading(false)));
};

export const checkOut = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      [],
      getConfig()
    )
    .then(() => {
      dispatch(getPurchases());
      dispatch(setCart([]));
    })
    .finally(() => dispatch(setIsloading(false)));
};

export const removeProduct = (cartProductId) => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .delete(
      `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${cartProductId}`,
      getConfig()
    )
    .catch((error) => console.log(error.response))
    .then(() => dispatch(getCart()))
    .finally(() => dispatch(setIsloading(false)));
};

export default mySlice.reducer;
