import { createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';

export const router = createBrowserRouter([...PrivateRoutes, ...PublicRoutes]);


