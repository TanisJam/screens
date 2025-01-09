import { Display, DisplayItem } from '@/models';

export const displayToDisplayItem = (
  display: Display[] | { [key: string]: Display }
): DisplayItem[] => {
  const displayArray = Array.isArray(display)
    ? display
    : Object.values(display);

  return displayArray.map((display) => ({
    id: display.id,
    name: display.name,
    price: display.price_per_day,
    resolution: `${display.resolution_width}x${display.resolution_height}`,
    size: display.size_type,
    duration: display.slot_length / 1000,
    type: display.location_type,
    images: display.pictures.map((picture) => picture.url),
  }));
};
