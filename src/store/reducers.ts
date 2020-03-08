import { combineReducers } from "redux";
import { State } from "../store";
import { Action, AppActions } from "../actions";

const initialState: State = {
  restaurants: {
    isFetching: false,
    isAdding: false,
    items: []
  }
};

export const appReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AppActions.FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          isFetching: true
        }
      };
    case AppActions.RECEIVED_RESTAURANTS:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          isFetching: false,
          items: [...action.payload]
        }
      };
    case AppActions.ADD_RESTAURANT:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          items: [...state.restaurants.items, { ...action.payload }],
          isAdding: true,
        }
      };
    case AppActions.SET_RESTAURANT:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          items: [...state.restaurants.items, action.payload]
        }
      };
    case AppActions.DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          items: state.restaurants.items.filter(r => r.docId !== action.payload)
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
