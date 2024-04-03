import { useEffect, useState } from 'react';
import { getBranches } from '@/services/branch';
import { errorNotification } from '@/helpers/notification'

const useBranchList = () => {
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true);

  const fetchBranches = async () => {
    try {
      setFetching(true);
      const response = await getBranches();
      setData(response.data.data.branches)
    } catch (err) {
      errorNotification({
        message: 'Error'
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    data,
    fetching
  };
};

export default useBranchList;
