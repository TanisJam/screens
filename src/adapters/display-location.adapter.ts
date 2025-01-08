import { Display, DisplayLocation } from '@/models';

export const convertDisplayToLocation = (
  displays: Display[]
): DisplayLocation[] => {
  return displays.map((display) => {
    return {
      latitude: display.latitude,
      longitude: display.longitude,
    };
  });
};
