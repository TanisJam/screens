import { useCallback } from 'react';
import {
  displaysActions,
  selectDisplays,
  selectDisplaysLoading,
  selectDisplaysError,
} from '@/store/displays/slice';
import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import { UseDisplays } from '@/models/display.model';

const useDisplays = (): Readonly<UseDisplays> => {
  const dispatch = useAppDispatch();

  return {
    displays: useAppSelector(selectDisplays),
    displaysLoading: useAppSelector(selectDisplaysLoading),
    displaysError: useAppSelector(selectDisplaysError),
    fetchDisplays: useCallback(() => {
      dispatch(displaysActions.fetchDisplaysIsLoading());
      dispatch(displaysActions.fetchDisplays());
    }, [dispatch]),
  };
};

export default useDisplays;
