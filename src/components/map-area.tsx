import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

interface MapAreaProps {
  lat_ne?: number;
  lat_sw?: number;
  lng_ne?: number;
  lng_sw?: number;
}

export const MapArea: React.FC<MapAreaProps> = ({
  lat_ne = -32.8688946,
  lat_sw = -33.0389608,
  lng_ne = -60.6051322,
  lng_sw = -60.7969586,
}) => {
  const bounds: [[number, number], [number, number]] = [
    [lat_sw, lng_sw],
    [lat_ne, lng_ne],
  ];

  const center: [number, number] = [
    (lat_ne + lat_sw) / 2,
    (lng_ne + lng_sw) / 2,
  ];

  function MapBoundsLogger() {
    const map = useMapEvents({
      moveend: () => {
        console.log('Map bounds:', map.getBounds());
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
      <Marker position={center} />
    </MapContainer>
  );
};
