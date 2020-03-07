import { createStore, combineReducers } from "redux";
import { Action, AppActions } from "../actions";
import { Restaurant } from '../types';

const initialState: State = {
  restaurants: [
    {
      id: '0',
      name: "My Restaurant",
      location: "Chelsea",
      rating: 4,
      tags: ["burger", "pizza"],
      description: "cool place",
      images: ["link-to-img", "link-to-second-img"]
    }
  ]
};

export interface State {
  restaurants: Restaurant[];
}

export const appReducer = (state:State = initialState, action:Action): State => { 
  switch (action.type) {
    case AppActions.SET_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      }
    case AppActions.DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter(r => r.id !== action.payload)
      }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  app: appReducer,
});

export type AppState = ReturnType<typeof reducers> 

export const store = createStore(reducers);
