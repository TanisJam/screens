import axios from 'axios';
import {
  GetDisplaysParams,
  DisplaySearchResponse,
} from '@/models/display.model';
import { convertArrayParams } from '@/utilities';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDisplays = async (
  params: GetDisplaysParams,
  signal?: AbortSignal
): Promise<DisplaySearchResponse> => {
  const response = await apiClient.get<DisplaySearchResponse>(
    '/displays/searchTest',
    {
      params: {
        ...params,
        ...convertArrayParams(params, ['location_type', 'size_type']),
      },
      signal,
    }
  );
  return response.data;
};

export const getDisplayById = async (id: string) => {
  const response = await apiClient.get(`/displays/${id}`, {
    params: {
      currency: 'USD',
      invoice_issuing_country: 'AR',
    },
  });
  return response.data;
};
