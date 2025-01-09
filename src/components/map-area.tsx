import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { DisplayLocation } from '@/models';
import { useAppState } from '@/hooks';
import L from 'leaflet';

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
  const { addDisplay, toggleModal, selectedDisplay } = useAppState();

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

  const Icon = L.icon({
    iconUrl: '/pin.svg',
    iconSize: [38, 95],
  });
  const IconFilled = L.icon({
    iconUrl: '/pin-filled.svg',
    iconSize: [38, 95],
  });

  const handleAddDisplay = (id: number) => {
    addDisplay(id);
    toggleModal();
  };

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
          riseOnHover
          icon={selectedDisplay?.id === screen.id ? IconFilled : Icon}
          position={[screen.latitude, screen.longitude]}
          title="Pantalla"
          eventHandlers={{
            click: () => handleAddDisplay(screen.id),
          }}
        ></Marker>
      ))}
    </MapContainer>
  );
};
