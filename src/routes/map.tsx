import { createFileRoute } from '@tanstack/react-router';
import useDisplays from '@/hooks/useDisplays';
import { useEffect } from 'react';

export const Route = createFileRoute('/map')({
  component: RouteComponent,
});

function RouteComponent() {
  const { displays, displaysLoading, fetchDisplays } = useDisplays();

  useEffect(() => {
    fetchDisplays();
  }, [fetchDisplays]);

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Mapa</h1>
      {displaysLoading && <p>Loading...</p>}
      <ul>
        {displays.map((display) => (
          <li key={display.id}>{display.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Add de hook to cancel api request (From Gentleman)
