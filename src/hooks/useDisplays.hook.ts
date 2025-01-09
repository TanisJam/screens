/**
 * Custom hook to manage display-related state and actions.
 *
 * @returns {Readonly<UseDisplays>} An object containing display state and actions.
 *
 * @property {Array} displays - The list of displays from the state.
 * @property {boolean} displaysLoading - The loading state of the displays.
 * @property {Error | null} displaysError - The error state of the displays.
 * @property {function} fetchDisplays - A callback function to fetch displays.
 *
 * @example
 * const { displays, displaysLoading, displaysError, fetchDisplays } = useDisplays();
 */
import { useCallback } from 'react';
import {
  displaysActions,
  selectDisplays,
  selectDisplaysLoading,
  selectDisplaysError,
  selectDisplaysQuery,
} from '@/store/displays/slice';
import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import { UseDisplays, GetDisplaysParams } from '@/models';

export const useDisplays = (): Readonly<UseDisplays> => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectDisplaysQuery);

  return {
    displays: useAppSelector(selectDisplays),
    displaysLoading: useAppSelector(selectDisplaysLoading),
    displaysError: useAppSelector(selectDisplaysError),
    displayQuery: query,
    setQuery: useCallback(
      (params: GetDisplaysParams) => {
        dispatch(displaysActions.setQuery(params));
      },
      [dispatch]
    ),
    resetQuery: useCallback(() => {
      dispatch(displaysActions.resetQuery());
    }, [dispatch]),
    fetchDisplays: useCallback(
      (controller: AbortController) => {
        dispatch(displaysActions.fetchDisplaysIsLoading());
        dispatch(displaysActions.fetchDisplays({ controller, params: query }));
      },
      [dispatch, query]
    ),
    fetchDisplayById: useCallback(
      (id: number) => {
        dispatch(displaysActions.fetchDisplayById(id));
      },
      [dispatch]
    ),
  };
};
