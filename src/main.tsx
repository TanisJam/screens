import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ConfigProvider, theme } from 'antd';

import './index.css';
import 'leaflet/dist/leaflet.css';
import '@ant-design/v5-patch-for-react-19';

import { routeTree } from './routeTree.gen';
import { Provider } from 'react-redux';
import { store } from '@/store/root/config.store';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
