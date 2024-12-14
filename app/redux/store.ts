import { configureStore } from '@reduxjs/toolkit';
import recipeSlider from './recipeSlider';

const store = configureStore({
    reducer : {
        recipe : recipeSlider
    }
  });

export default store;