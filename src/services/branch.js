import ServerAxios from '@/helpers/ServerAxios';

const getBranches = () => ServerAxios.get('/v1/branches');

const getBranchDetail = (branchNumber) => ServerAxios.get(`/v1/branches/${branchNumber}`);

const updateBranch = (branchNumber, body) => ServerAxios.patch(`/v1/branches/${branchNumber}`, body);

export {
  getBranches,
  getBranchDetail,
  updateBranch
};


