import { createFileRoute } from '@tanstack/react-router';
import { useDisplays } from '@/hooks';
import { useEffect } from 'react';
import { GetDisplaysParams } from '@/models';
import { DisplayListing } from '@/components';
import { displayToDisplayItem } from '@/adapters';

export const Route = createFileRoute('/map')({
  component: RouteComponent,
  validateSearch: (params: GetDisplaysParams) => {
    return params;
  },
});

function RouteComponent() {
  const { displays, displaysLoading, fetchDisplays } = useDisplays();
  const params = Route.useSearch();

  useEffect(() => {
    const controller = new AbortController();
    fetchDisplays(controller, params);
    return () => {
      controller.abort();
    };
  }, [fetchDisplays, params]);
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Mapa</h1>
      <DisplayListing
        loading={displaysLoading}
        displays={displayToDisplayItem(displays)}
      />
    </div>
  );
}
