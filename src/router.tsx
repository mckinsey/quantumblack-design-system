import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router';

import { Navbar } from '@/components/registry/navbar';
import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from '@/components/registry/registry-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const ComponentsPage = lazy(
  () => import('./app/(registry)/docs/components/page'),
);
const InstallationPage = lazy(
  () => import('./app/(registry)/docs/installation/page'),
);
const IntroductionPage = lazy(() => import('./app/(registry)/docs/page'));
const RegistryItemPage = lazy(
  () => import('./app/(registry)/registry/[name]/page'),
);

function RegistryLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <SidebarProvider>
        <MobileSidebarTrigger />
        <RegistrySidebar />
        <main className="bg-surface-base flex-1 overflow-auto">
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </SidebarProvider>
    </div>
  );
}

export const router = createBrowserRouter(
  [
    {
      element: <RegistryLayout />,
      children: [
        { index: true, element: <IntroductionPage /> },
        { path: 'components', element: <ComponentsPage /> },
        { path: 'installation', element: <InstallationPage /> },
        { path: 'registry/:name', element: <RegistryItemPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || '/',
  },
);
