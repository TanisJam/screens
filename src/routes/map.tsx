import { createFileRoute } from '@tanstack/react-router';
import { useDisplays } from '@/hooks';
import { useEffect } from 'react';
import { GetDisplaysParams } from '@/models';
import { DisplayListing } from '@/components';
import { convertDisplayToLocation, displayToDisplayItem } from '@/adapters';
import { MapArea } from '@/components/map-area';
import { debounce } from '@/utilities';

export const Route = createFileRoute('/map')({
  component: RouteComponent,
  validateSearch: (params: GetDisplaysParams) => {
    return params;
  },
});

function RouteComponent() {
  const { displays, displaysLoading, fetchDisplays } = useDisplays();
  const params = Route.useSearch();
  const { lat_ne = -33, lat_sw = -32, lng_ne = -60, lng_sw = -60 } = params;
  const bounds: [[number, number], [number, number]] = [
    [lat_sw, lng_sw],
    [lat_ne, lng_ne],
  ];

  useEffect(() => {
    const controller = new AbortController();
    fetchDisplays(controller, params);
    return () => {
      controller.abort();
    };
  }, [fetchDisplays, params]);

  const onBoundsChange = debounce(
    async (newBounds: [[number, number], [number, number]]) => {
      const [lat_sw, lng_sw] = newBounds[0];
      const [lat_ne, lng_ne] = newBounds[1];

      const controller = new AbortController();
      fetchDisplays(controller, {
        ...params,
        lat_sw,
        lng_sw,
        lat_ne,
        lng_ne,
      });
    },
    500
  );

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Mapa</h1>
      <div className="flex flex-col-reverse sm:grid gap-4 grid-cols-10">
        <div
          className="max-w-xl mx-auto p-4 sm:col-span-5 xl:col-span-4 sm:overflow-y-auto"
          style={{ maxHeight: '90vh' }}
        >
          <DisplayListing
            loading={displaysLoading}
            displays={displayToDisplayItem(displays)}
          />
        </div>
        <div className="w-full sm:col-span-5 xl:col-span-6">
          <MapArea
            bounds={bounds}
            screensMarkers={convertDisplayToLocation(displays)}
            onBoundsChange={onBoundsChange}
          />
        </div>
      </div>
    </div>
  );
}
