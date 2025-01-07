import { useCallback } from 'react';
import { displaysActions, selectDisplays } from '@/store/displays/slice';
import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import { Display } from '@/models/display.model';

interface UseDisplays {
  displays: Display[];
  fetchDisplays: VoidFunction;
}

const useDisplays = (): Readonly<UseDisplays> => {
  const dispatch = useAppDispatch();

  return {
    displays: useAppSelector(selectDisplays),
    fetchDisplays: useCallback(() => {
      dispatch(displaysActions.fetchDisplaysIsLoading());
      dispatch(displaysActions.fetchDisplays());
    }, [dispatch]),
  };
};

export default useDisplays;
