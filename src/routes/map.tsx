import { createFileRoute } from '@tanstack/react-router';
import { useDisplays, useAppState } from '@/hooks';
import { useEffect, useState } from 'react';
import { GetDisplaysParams } from '@/models';
import { DisplayDetailsModal, DisplayListing } from '@/components';
import { convertDisplayToLocation, displayToDisplayItem } from '@/adapters';
import { MapArea } from '@/components/map-area';
import { debounce } from '@/utilities';
import { DisplayFilters } from '@/components/display-filters';

export const Route = createFileRoute('/map')({
  component: RouteComponent,
  validateSearch: (params: GetDisplaysParams) => {
    return params;
  },
});

function RouteComponent() {
  const { addDisplay, selectedDisplay } = useAppState();
  const { displays, displaysLoading, fetchDisplays, setQuery, resetQuery } =
    useDisplays();
  const params = Route.useSearch();
  const defaultBounds: [[number, number], [number, number]] = [
    [params.lat_sw ?? -32, params.lng_sw ?? -60],
    [params.lat_ne ?? -33, params.lng_ne ?? -60],
  ];

  const [bounds, setBounds] = useState(defaultBounds);

  useEffect(() => {
    setQuery(params);
  }, [params, setQuery]);

  useEffect(() => {
    const controller = new AbortController();
    fetchDisplays(controller);
    return () => controller.abort();
  }, [fetchDisplays]);

  useEffect(() => {
    setQuery({
      ...params,
      lat_ne: bounds[1][0],
      lat_sw: bounds[0][0],
      lng_ne: bounds[1][1],
      lng_sw: bounds[0][1],
    });
  }, [bounds, setQuery, params]);

  const onBoundsChange = debounce(setBounds, 500);

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Mapa</h1>
      <div className="flex flex-col-reverse sm:grid gap-4 grid-cols-10">
        <div
          className="w-full max-w-xl mx-auto p-4 sm:col-span-5 xl:col-span-4 sm:overflow-y-auto"
          style={{ maxHeight: '90vh' }}
        >
          <DisplayFilters
            onApplyFilters={(filtros) => {
              setQuery({
                ...params,
                ...filtros,
              });
            }}
            onSearch={(search) => {
              setQuery({
                ...params,
                search,
              });
            }}
            resetFilters={() => {
              resetQuery();
            }}
          />
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
      {selectedDisplay !== null && (
        <DisplayDetailsModal
          visible={selectedDisplay !== null}
          onClose={() => addDisplay(null)}
          item={selectedDisplay}
        />
      )}
    </div>
  );
}
