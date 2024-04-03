import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import CustomHeader from '../Header/index';

function Page() {
  return (
    <AppShell header={<CustomHeader />}>
      <Outlet />
    </AppShell>
  );
}

export default Page;
