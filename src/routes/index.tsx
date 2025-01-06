import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Buscador de Campañas</h1>
    </div>
  );
}
