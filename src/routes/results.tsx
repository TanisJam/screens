import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/results')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Resultados</h1>
    </div>
  );
}
