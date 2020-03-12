import { combineReducers } from "redux";
import { State } from "../store";
import { Action, AppActions } from "../actions";

const initialState: State = {
  restaurants: {
    isFetching: false,
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
          items: [...state.restaurants.items, ...action.payload],
          isFetching: false
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
    case AppActions.EDIT_RESTAURANT:
      // todo see if there is a better way to do this. 
      const restaurantsWithoutOriginal = state.restaurants.items.filter(r => r.docId !== action.payload.docId);

      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          items: [...restaurantsWithoutOriginal, action.payload]
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer
});
