import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="p-2 flex gap-2 container mx-auto max-w-3xl">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </header>
      <hr />
      <main className="mx-auto  p-2">
        <Outlet />
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
