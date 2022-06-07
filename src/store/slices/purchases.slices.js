import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsloading } from "./isLoading.Slice";
import getConfig from "../../utils/getConfig";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPurchases } = purchasesSlice.actions;

export const getPurchases = () => (dispatch) => {
  dispatch(setIsloading(true));
  return axios
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data)))
    .finally(() => dispatch(setIsloading(false)));
};

export default purchasesSlice.reducer;
