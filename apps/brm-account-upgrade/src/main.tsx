import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { useAppModeStore } from '@libs/store';

import './styles.scss';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

useAppModeStore.getState().setStandalone(true);

root.render(
  <StrictMode>
    <App isStandAlone={true} />
  </StrictMode>,
);
