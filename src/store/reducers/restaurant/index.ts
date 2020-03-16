import { Action, AppActions } from "../../../actions";

export interface RestaurantState {
  isFetching: boolean;
  items: Restaurant[];
}

const initialState: RestaurantState = {
  isFetching: false,
  items: []
};

const restaurantReducer = (state: RestaurantState = initialState, action: Action): RestaurantState => {
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

export default restaurantReducer;

//todo bug fix - go to list, see count, click a restaurant, go back, count has doubled
// This is because every time we go to the list page we pull all the restaurants
// when that happens we call RECEIVED_RESTAURANTS action which appends all restaurants
// currently in state plus the newly received restaurants. we want to only spread the
// action.payload on line 23. 
// However, addRestaurant action also used the RECEIVED_RESTAURANTS reducer to update
// state with the newly added restaurant so we can't just spread ...action.payload
// we need to create a new reducer type 
