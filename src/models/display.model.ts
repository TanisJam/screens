export const SizeTypeText = {
  small: 'Pequeño',
  medium: 'Mediano',
  big: 'Grande',
  giant: 'Gigante',
} as const;
export type SizeType = keyof typeof SizeTypeText;

export const LocationTypeText = {
  indoor: 'Interior',
  outdoor: 'Exterior',
  pos: 'Punto de Venta',
  buses: 'Buses',
} as const;
export type LocationType = keyof typeof LocationTypeText;

export interface GetDisplaysParams {
  date_from: string;
  date_to: string;
  lat_sw?: number;
  lng_sw?: number;
  lat_ne?: number;
  lng_ne?: number;
  page?: number;
  per_page?: number;
  search?: string;
  location_type?: LocationType[];
  price_min?: number;
  price_max?: number;
  size_type?: SizeType[];
}

type DisplayPicture = {
  id: number;
  display_id: number;
  url: string;
};

export type Display = {
  id: number;
  name: string;
  resolution_width: number;
  resolution_height: number;
  latitude: number;
  longitude: number;
  administrative_area_level_1: string;
  administrative_area_level_2: string;
  formatted_address: string;
  zip_code: string;
  country: string;
  slots: number;
  slot_length: number;
  shows_per_hour: number;
  price_per_day: number;
  location_type: LocationType;
  size_type: SizeType;
  size_width: number;
  size_height: number;
  description: string | null;
  country_iso: string;
  external_programmatic_cpm: string;
  price_currency: string;
  cpmi: string;
  is_online: boolean;
  pictures: DisplayPicture[];
};

export interface DisplayItem {
  id: number;
  name: string;
  price: number;
  resolution: string;
  size: SizeType;
  duration: number;
  type: LocationType;
  images: string[];
}

export interface DisplayLocation {
  latitude: number;
  longitude: number;
}

export interface DisplaySearchResponse {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: Display[];
}

export interface FetchDisplaysPayload {
  controller: AbortController;
  params: GetDisplaysParams;
}

export interface UseDisplays {
  displays: Display[];
  displaysLoading: boolean;
  displaysError: string;
  fetchDisplays: (
    controller: AbortController,
    params: GetDisplaysParams
  ) => void;
}
