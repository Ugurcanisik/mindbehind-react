import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './redux/store';
import { injectStore } from './helpers/ServerAxios';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

injectStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Notifications />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </PersistGate>
  </Provider>
);
