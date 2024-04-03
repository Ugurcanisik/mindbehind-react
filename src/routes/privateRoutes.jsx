import Page from '../layouts/Page';
import { store } from '@/redux/store';
import { Navigate, redirect } from 'react-router-dom';
import { Branch, BranchList, BranchDetail } from '@/pages/Branch';

const wait = (timeout) => new Promise(resolve => { setTimeout(resolve, timeout) });

const PrivateRoutes = [
  {
    path: '/',
    loader: async () => {
      let isAuth = store.getState().auth.user.token;
      if (!isAuth) {
        await wait(100);
        isAuth = store.getState().auth.user.token;
      }
      return !isAuth ? redirect('/login') : null
    },
    element: <Page />,

    children: [
      {
        path: '',
        element: <Navigate to='branches' />
      },
      {
        path: '/branches',
        element: <Branch />,
        children: [
          {
            index: true,
            element: <BranchList />
          },
          {
            path: ':branchNumber',
            element: <BranchDetail />
          }
        ]
      }
    ]
  }
];

export default PrivateRoutes;
