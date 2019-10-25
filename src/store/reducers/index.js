import { combineReducers } from 'redux';
import {
  restaurantsReducer,
  selectedRestaurantImagesReducer,
} from './restaurants';
import { uiReducer } from './ui';

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  selectedRestaurantImages: selectedRestaurantImagesReducer,
  ui: uiReducer,
});
