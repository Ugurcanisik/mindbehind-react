import { useEffect, useState } from 'react';
import { getBranchDetail } from '@/services/branch';
import { errorNotification } from '@/helpers/notification'

const useBranchDetail = (branchNumber) => {
  const [data, setData] = useState({
    branchNumber: null,
    latitude: null,
    longitude: null,
    name: null,
    fullAddress: null,
    phone: null
  })
  const [fetching, setFetching] = useState(true);

  const fetchBranchDetail = async () => {
    if (!branchNumber) { return; }

    try {
      setFetching(true);
      const response = await getBranchDetail(branchNumber);
      setData(response.data.data.branch)
    } catch (err) {
      if (err.response.status === 404) {
        errorNotification({
          message: 'Branch not found'
        });
      }
      errorNotification({
        message: 'Error'
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBranchDetail();
  }, []);

  return {
    data,
    fetching
  };
};

export default useBranchDetail;
