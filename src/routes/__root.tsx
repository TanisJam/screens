import { CartDropdown, DisplayDetailsModal } from '@/components';
import { useAppCart, useAppState } from '@/hooks';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { message } from 'antd';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: App,
});

function App() {
  const { selectedDisplay, toggleModal, isModalOpen } = useAppState();
  const { items, removeFromCart } = useAppCart();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    messageApi.success('Elemento removido del carrito');
  };

  return (
    <>
      {contextHolder}
      <header className="p-2 flex place-content-between gap-2 container mx-auto max-w-3xl">
        <Link to="/" className="mx-2 my-auto text-2xl font-bold text-blue-500">
          Inicio
        </Link>
        <div className="mx-2">
          <CartDropdown items={items} onRemoveItem={handleRemoveItem} />
        </div>
      </header>
      <hr />
      <main className="mx-auto  p-2">
        <Outlet />
        {selectedDisplay !== null && (
        <DisplayDetailsModal
          visible={isModalOpen}
          onClose={() => toggleModal()}
          item={selectedDisplay}
        />
      )}
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
