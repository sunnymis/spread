import { combineReducers } from "redux";
import { RestaurantState } from "../store";
import { Action, AppActions } from "../actions";

const initialState: RestaurantState = {
  isFetching: false,
  items: []
};

export const restaurantReducer = (state: RestaurantState = initialState, action: Action): RestaurantState => {
  switch (action.type) {
    case AppActions.FETCH_RESTAURANTS:
      return {
        ...state,
        isFetching: true
      };
    case AppActions.RECEIVED_RESTAURANTS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isFetching: false
      };
    case AppActions.DELETE_RESTAURANT:
      return {
        ...state,
        items: state.items.filter(r => r.docId !== action.payload)
      };
    case AppActions.EDIT_RESTAURANT:
      // todo see if there is a better way to do this. 
      const restaurantsWithoutOriginal = state.items.filter(r => r.docId !== action.payload.docId);

      return {
        ...state,
        items: [...restaurantsWithoutOriginal, action.payload]
      };
    default:
      return state;
  }
};

export default combineReducers({
  restaurants: restaurantReducer
});
