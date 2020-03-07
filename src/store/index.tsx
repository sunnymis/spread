import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { Action, AppActions } from "../actions";

const initialState: State = {
  restaurants: {
    isFetching: false,
    items: [
      {
        id: "0",
        name: "My Restaurant",
        location: "Chelsea",
        rating: 4,
        tags: ["burger", "pizza"],
        description: "cool place",
        images: ["link-to-img", "link-to-second-img"],
        docId: "something"
      }
    ]
  }
};

export interface State {
  restaurants: {
    isFetching: boolean;
    items: Restaurant[];
  };
}

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
          items: state.restaurants.items.filter(r => r.id !== action.payload)
        }
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  app: appReducer
});

export type AppState = ReturnType<typeof reducers>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
