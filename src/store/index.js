import { createStore, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (action, state) => {
  return {
    ...state
  };
};

export const store = createStore(rootReducer, composeEnhancers());
