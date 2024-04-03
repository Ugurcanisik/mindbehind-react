import { Navigate } from 'react-router-dom';
import Login from '@/pages/Login';

const PublicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]


export default PublicRoutes;
