import { createSlice } from "@reduxjs/toolkit";


const userSlider = createSlice({
  name: "recipeSlider",
  initialState: {
    username : ""
  },
  reducers: {
    setUsername : (state, action) => {
        state.username = action.payload
    }
  }
});




export const { setUsername } = userSlider.actions;
export default userSlider.reducer;