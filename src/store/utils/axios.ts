import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'https://allinone.yannicksendrey.dev/api/',
  timeout: 1000,
});

export default instanceAxios;
