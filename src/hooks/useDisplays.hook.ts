import { useCallback } from 'react';
import {
  displaysActions,
  selectDisplays,
  selectDisplaysLoading,
  selectDisplaysError,
} from '@/store/displays/slice';
import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import { UseDisplays, GetDisplaysParams } from '@/models/display.model';

/**
 * Custom hook for managing displays data and related operations
 * @returns {Readonly<UseDisplays>} An object containing:
 * - displays: Current displays data from the store
 * - displaysLoading: Loading state for displays
 * - displaysError: Error state for displays operations
 * - fetchDisplays: Function to fetch displays data
 *   @param {AbortController} controller - AbortController to cancel the request
 *   @param {GetDisplaysParams} params - Parameters for fetching displays
 */
export const useDisplays = (): Readonly<UseDisplays> => {
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
