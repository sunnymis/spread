import { useSelector } from 'react-redux';

export function useLoading() {
  return useSelector(state => {
    return state.ui.loading;
  });
}
