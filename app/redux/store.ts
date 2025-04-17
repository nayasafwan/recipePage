import { configureStore } from '@reduxjs/toolkit';
import recipeSlider from './recipeSlider';
import recipeForm from './recipeFormSlider';
import userSlider from "./userSlider"

const store = configureStore({
    reducer : {
        recipe : recipeSlider,
        recipeForm : recipeForm,
        user : userSlider
    }
  });

export default store;