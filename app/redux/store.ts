import { configureStore } from '@reduxjs/toolkit';
import recipeSlider from './recipeSlider';
import recipeForm from './recipeFormSlider';

const store = configureStore({
    reducer : {
        recipe : recipeSlider,
        recipeForm : recipeForm
    }
  });

export default store;