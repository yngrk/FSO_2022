import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const add = (newObj) => {
  return axios.post(baseUrl, newObj).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, newObj) => {
  return axios
    .put(`${baseUrl}/${id}`, newObj)
    .then((response) => response.data);
};

export { getAll, add, remove, update };
