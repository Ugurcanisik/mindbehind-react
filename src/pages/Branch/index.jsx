import PageTransitions from '@/components/PageTransitions';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BranchList from './BranchList'
import BranchDetail from './BranchDetail'

function Branch() {
  return (
    <PageTransitions>
      <Helmet>
        <title>Branches</title>
      </Helmet>
      <Outlet />
    </PageTransitions>
  );
}

export {
  Branch,
  BranchList,
  BranchDetail
}

