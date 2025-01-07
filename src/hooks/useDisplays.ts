import { useCallback } from 'react';
import {
  displaysActions,
  selectDisplays,
  selectDisplaysLoading,
  selectDisplaysError,
} from '@/store/displays/slice';
import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import {
  UseDisplays,
  GetDisplaysParams,
} from '@/models/display.model';



const useDisplays = (): Readonly<UseDisplays> => {
  const dispatch = useAppDispatch();

  return {
    displays: useAppSelector(selectDisplays),
    displaysLoading: useAppSelector(selectDisplaysLoading),
    displaysError: useAppSelector(selectDisplaysError),
    fetchDisplays: useCallback(
      (controller: AbortController, params: GetDisplaysParams) => {
        dispatch(displaysActions.fetchDisplaysIsLoading());
        dispatch(displaysActions.fetchDisplays({ controller, params }));
      },
      [dispatch]
    ),
  };
};

export default useDisplays;
