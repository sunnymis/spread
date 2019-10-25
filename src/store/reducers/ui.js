import { TOGGLE_LOADER } from '../actions/ui';

const uiInitialState = {
  loading: false,
};

export const uiReducer = (ui = uiInitialState, action) => {
  if (action.type === TOGGLE_LOADER) {
    return {
      ...ui,
      loading: action.payload,
      meta: action.meta,
    };
  }

  return ui;
};
