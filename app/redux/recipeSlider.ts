import { createSlice } from "@reduxjs/toolkit";


const recipeSlider = createSlice({
  name: "recipeSlider",
  initialState: {
    searchValue : "",
    category : "",
    showAuthModal : false
  },
  reducers: {
    setSeachValue : (state, action) => {
        state.searchValue = action.payload
    },
    setCategory : (state, action) => {
        state.category = action.payload
    },
    setAuthModal : (state, action) => {
        state.showAuthModal = action.payload
    }
  }
});




export const { setSeachValue, setCategory, setAuthModal } = recipeSlider.actions;
export default recipeSlider.reducer;