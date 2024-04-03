import ServerAxios from '@/helpers/ServerAxios';

const login = (payload) => ServerAxios.post('/v1/auth/login', payload);

export {
  login
};
