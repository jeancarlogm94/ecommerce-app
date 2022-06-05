import { createSlice } from "@reduxjs/toolkit";

export const isLoadingSlices = createSlice({
  name: "isLoading",
  initialState: true,
  reducers: {
    setIsloading: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsloading } = isLoadingSlices.actions;

export default isLoadingSlices.reducer;
