import { BrowserRouter, MemoryRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { MFE_APPS_BASE_PATH, useRemoteRouter } from '@libs/core';
import { routes } from './routes';

type AppProps = {
  isStandAlone?: boolean;
  initialPath?: string;
};

export function App({ isStandAlone = false, initialPath }: AppProps) {
  const appName = MFE_APPS_BASE_PATH.BO;
  const router = useRemoteRouter({
    isStandAlone,
    routes,
    initialPath,
    appName,
  });

  return <RouterProvider router={router} />;

  // return (
  //   <MemoryRouter>
  //     <Routes>
  //       <Route path="/" element={<div style={{ color: "red" }}>Hello World</div>} />
  //     </Routes>
  //   </MemoryRouter>
  // );
}

export default App;
