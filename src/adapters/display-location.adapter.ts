import { Display, DisplayLocation } from '@/models';

export const convertDisplayToLocation = (
  displays: Display[] | Record<string, Display>
): DisplayLocation[] => {
  const displayArray = Array.isArray(displays)
    ? displays
    : Object.values(displays);

  return displayArray.map((display) => {
    return {
      latitude: display.latitude,
      longitude: display.longitude,
      id: display.id,
    };
  });
};
