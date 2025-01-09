import axios from 'axios';
import { LocationData } from '@/models';

const BASE_URL = 'https://nominatim.openstreetmap.org';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLocation = async (
  location: string,
  signal?: AbortSignal
): Promise<LocationData[]> => {
  const response = await apiClient.get<LocationData[]>('/search', {
    params: {
      format: 'json',
      q: location,
    },
    signal,
  });
  return response.data;
};
