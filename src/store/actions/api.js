export const API_REQUEST = 'API_REQUEST';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';

export const apiRequest = ({ request, onSuccess }) => ({
  type: 'API_REQUEST',
  request: request,
  meta: {
    onSuccess,
  },
});
