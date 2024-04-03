import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './assets/scss/index.scss';

export default function App() {
  return <RouterProvider router={router} />
}
