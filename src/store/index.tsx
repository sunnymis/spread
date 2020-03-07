import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

export interface State {
  restaurants: {
    isFetching: boolean;
    items: Restaurant[];
  };
}

export type AppState = ReturnType<typeof reducers>;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
