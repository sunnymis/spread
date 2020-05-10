export enum AppActions {
  FETCH_RESTAURANTS = 'APP/FETCH_RESTAURANTS',
  RECEIVED_RESTAURANTS = 'APP/RECEIVED_RESTAURANTS',
  RECEIVED_RESTAURANT = 'APP/RECEIVED_RESTAURANT',
  DELETE_RESTAURANT = 'APP/DELETE_RESTAURANT',
  EDIT_RESTAURANT = 'APP/EDIT_RESTAURANT',
}

type ActionFn = (...args: any[]) => any;

interface Actions {
  [actionName: string]: ActionFn;
}

interface Meta {
  [key: string]: any;
}
// The Union of the return types of each Action creator
// The return type of the action creator is the action object
// So its the union of the objects
type ActionUnions<T extends Actions> = ReturnType<T[keyof T]>;

// The problem with the types below is that Action interface has
// payload as any.  We want to make a generic function that you
// pass in the action type and payload type.
// The call site (where we call disaptch(SetAge..)) knows the return type of
// payload because of the function signaturre. However appReducer doesn't
// know the type of the action payload
export const makeAction = <A extends AppActions, P>(type: A) => (payload: P, meta?: Meta) => ({
  type,
  payload,
  meta,
});

export const fetchRestaurants = makeAction<AppActions.FETCH_RESTAURANTS, string>(
  AppActions.FETCH_RESTAURANTS,
);
export const receivedRestaurants = makeAction<AppActions.RECEIVED_RESTAURANTS, Restaurant[]>(
  AppActions.RECEIVED_RESTAURANTS,
);
export const receivedRestaurant = makeAction<AppActions.RECEIVED_RESTAURANT, Restaurant[]>(
  AppActions.RECEIVED_RESTAURANT,
);
export const deleteRestaurant = makeAction<AppActions.DELETE_RESTAURANT, string>(
  AppActions.DELETE_RESTAURANT,
);
export const editRestaurant = makeAction<AppActions.EDIT_RESTAURANT, Restaurant>(
  AppActions.EDIT_RESTAURANT,
);

const actions = {
  fetchRestaurants,
  receivedRestaurants,
  receivedRestaurant,
  deleteRestaurant,
  editRestaurant,
};

export type Action = ActionUnions<typeof actions>;
