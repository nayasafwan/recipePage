import { createSlice } from "@reduxjs/toolkit";


const recipeSlider = createSlice({
  name: "recipeSlider",
  initialState: {
    searchValue : "",
    category : ""
  },
  reducers: {
    setSeachValue : (state, action) => {
        state.searchValue = action.payload
    },
    setCategory : (state, action) => {
        state.category = action.payload
    }
  }
});




export const { setSeachValue, setCategory } = recipeSlider.actions;
export default recipeSlider.reducer;