import { Action, AppActions } from "../../actions";

export interface RestaurantState {
  isFetching: boolean;
  items: Restaurant[];
}

const initialState: RestaurantState = {
  isFetching: false,
  items: [],
};

const restaurantReducer = (
  state: RestaurantState = initialState,
  action: Action
): RestaurantState => {
  switch (action.type) {
    case AppActions.FETCH_RESTAURANTS:
      return {
        ...state,
        isFetching: true,
      };
    case AppActions.RECEIVED_RESTAURANTS:
      return {
        ...state,
        items: [...action.payload],
        isFetching: false,
      };
    case AppActions.RECEIVED_RESTAURANT:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isFetching: false,
      };
    case AppActions.DELETE_RESTAURANT:
      return {
        ...state,
        items: state.items.filter((r) => r.docId !== action.payload),
      };
    case AppActions.EDIT_RESTAURANT:
      // todo see if there is a better way to do this.
      const restaurantsWithoutOriginal = state.items.filter(
        (r) => r.docId !== action.payload.docId
      );

      return {
        ...state,
        items: [...restaurantsWithoutOriginal, action.payload],
      };
    default:
      return state;
  }
};

export default restaurantReducer;
