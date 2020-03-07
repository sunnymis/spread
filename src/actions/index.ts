import { Restaurant } from '../types/index';

export enum AppActions {
  SET_RESTAURANT = "APP/SET_RESTAURANT",
  DELETE_RESTAURANT = "APP/DELETE_RESTAURANT",
}

type ActionFn = (...args: any[]) => any

interface Actions {
  [actionName: string]: ActionFn
}

// The Union of the return types of each Action creator
// The return type of the action creator is the action object
// So its the union of the objects
type ActionUnions<T extends Actions> = ReturnType<T[keyof T]>

// The problem with the types below is that Action interface has 
// payload as any.  We want to make a generic function that you 
// pass in the action type and payload type. 
// The call site (where we call disaptch(SetAge..)) knows the return type of
// payload because of the function signaturre. However appReducer doesn't
// know the type of the action payload 
export const makeAction = <A extends AppActions, P>(type: A) => (payload: P) => {
  return {
    type,
    payload,
  }
}

export const SetRestaurant = makeAction<AppActions.SET_RESTAURANT, Restaurant>(AppActions.SET_RESTAURANT); 
export const DeleteRestaurant = makeAction<AppActions.DELETE_RESTAURANT, string>(AppActions.DELETE_RESTAURANT); 


const actions = {
  SetRestaurant,
  DeleteRestaurant,
};

export type Action = ActionUnions<typeof actions>
