import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const response = axios.get(baseUrl).then((res) => res.data);
  return response;
};

export default { getAll };
