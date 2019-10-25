import { combineReducers } from 'redux';
import { restaurantsReducer } from './restaurants';
import { uiReducer } from './ui';

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  ui: uiReducer,
});
