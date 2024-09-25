import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients-slice';
import { burgerConstructorReducer } from './slices/burger-constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer
});
