import { GetDisplaysParams, LocationData, FormValues } from '@/models';
import { dateToString } from '@/utilities';

export const createDisplaysSearchAdapter = (
  locationData: LocationData,
  values: FormValues
): GetDisplaysParams => {
  return {
    date_from: dateToString(values.dateRange[0]),
    date_to: dateToString(values.dateRange[1]),
    lat_sw: Number(locationData.boundingbox[0]),
    lng_sw: Number(locationData.boundingbox[2]),
    lat_ne: Number(locationData.boundingbox[1]),
    lng_ne: Number(locationData.boundingbox[3]),
    // page: 1,
    // per_page: 10,
    // search: '',
    // location_type: [],
    // price_min: 0,
    // price_max: 0,
    // size_type: [],
  };
};
