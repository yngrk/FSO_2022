import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (updateObj) => {
  const response = await axios.put(`${baseUrl}/${updateObj.id}`, updateObj);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll, setToken, create, update, remove,
};
