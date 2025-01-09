import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { DisplayLocation } from '@/models';

interface MapAreaProps {
  bounds: [[number, number], [number, number]];
  screensMarkers: DisplayLocation[];
  onBoundsChange?: (bounds: [[number, number], [number, number]]) => void;
}

export const MapArea: React.FC<MapAreaProps> = ({
  bounds,
  screensMarkers = [],
  onBoundsChange,
}) => {
  function MapBoundsLogger() {
    const map = useMapEvents({
      moveend: () => {
        onBoundsChange?.([
          [map.getBounds().getSouth(), map.getBounds().getWest()],
          [map.getBounds().getNorth(), map.getBounds().getEast()],
        ]);
      },
    });
    return null;
  }

  return (
    <MapContainer className="h-[50vh] sm:h-[90vh] w-full" bounds={bounds}>
      <MapBoundsLogger />
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      {screensMarkers.map((screen, index) => (
        <Marker
          key={index}
          position={[screen.latitude, screen.longitude]}
          title="Pantalla"
          eventHandlers={{
            click: () => {
              console.log('click');
            },
            mouseover: () => {
              console.log('mouseover');
            },
          }}
        />
      ))}
    </MapContainer>
  );
};
