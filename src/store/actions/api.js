export const API_REQUEST = 'API_REQUEST';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const GET_RESTAURANT_IMAGES = 'GET_RESTAURANT_IMAGES';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';

export const apiRequest = ({ request, onSuccess, meta }) => ({
  type: 'API_REQUEST',
  request: request,
  meta: {
    onSuccess,
    ...meta,
  },
});
