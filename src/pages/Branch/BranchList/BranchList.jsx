import { Loader, Button } from '@mantine/core';
import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import useBranchList from '@/hooks/useBranchList';
import { useSelector } from 'react-redux';
import { user as userConstants } from '@/constants'

const BranchList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data: branches, fetching } = useBranchList()

  const dataTableColumns = useMemo(() => ([
    {
      name: 'Sipariş Numarası',
      selector: (row) => row.branchNumber,
      center: true,
      style: { textAlign: 'center' }
    },
    {
      name: 'Şube Adı',
      selector: (row) => row.name,
      center: true,
      style: { textAlign: 'center' }
    },
    {
      name: 'Sipariş Adresi',
      selector: (row) => row.fullAddress,
      sortable: true,
      center: true,
      style: { textAlign: 'center' }
    },
    {
      name: 'Şube Telefonu',
      selector: (row) => row.phone,
      sortable: true,
      center: true,
      style: { textAlign: 'center' }
    },
    {
      name: 'Şube Konumu',
      selector: (row) => row.latitude + ' , ' + row.longitude,
      center: true,
      style: { textAlign: 'center' }
    },
    {
      name: 'İşlemler',
      button: true,
      selector: (row) => (
        <Button
          disabled={user.role !== userConstants.permissions.owner}
          mr={10}
          onClick={() => navigate(`/branches/${row.branchNumber}`)}
        >
            Güncelle
        </Button>
      ),
      width: '250px',
      style: { textAlign: 'center' }
    }
  ]), []);

  return (
    <div className='branch-page'>
      <div className='container'>
        <DataTable
          subHeader
          columns={dataTableColumns}
          data={branches}
          progressPending={fetching}
          progressComponent={(<Loader height={400} mt='xl' />)}
          persistTableHead
          fixedHeader
          fixedHeaderScrollHeight='800px'
          noDataComponent='Gösterilecek herhangi bir Şube bulunamadı.'
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
}

export default BranchList;
