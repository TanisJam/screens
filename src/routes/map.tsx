import { createFileRoute } from '@tanstack/react-router';
import { useDisplays } from '@/hooks';
import { useEffect } from 'react';
import { GetDisplaysParams } from '@/models';
import { DisplayListing } from '@/components';
import { displayToDisplayItem } from '@/adapters';
import { MapArea } from '@/components/map-area';

export const Route = createFileRoute('/map')({
  component: RouteComponent,
  validateSearch: (params: GetDisplaysParams) => {
    return params;
  },
});

function RouteComponent() {
  const { displays, displaysLoading, fetchDisplays } = useDisplays();
  const params = Route.useSearch();
  const { lat_ne, lat_sw, lng_ne, lng_sw } = params;

  useEffect(() => {
    const controller = new AbortController();
    fetchDisplays(controller, params);
    return () => {
      controller.abort();
    };
  }, [fetchDisplays, params]);

  console.log('params', params);
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Mapa</h1>
      <div className="flex flex-col-reverse sm:grid gap-4 grid-cols-10">
        <div className="max-w-xl mx-auto p-4 sm:col-span-5 xl:col-span-4 sm:overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <DisplayListing
            loading={displaysLoading}
            displays={displayToDisplayItem(displays)}
          />
        </div>
        <div className="w-full sm:col-span-5 xl:col-span-6">
          <MapArea
            lat_ne={lat_ne}
            lat_sw={lat_sw}
            lng_ne={lng_ne}
            lng_sw={lng_sw}
          />
        </div>
      </div>
    </div>
  );
}
