import axios from 'axios';
import store from '@/store/store';
import { getToken } from '@/utils/auth';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000             // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log('error', error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      if (response.data.result && !response.data.token) response.data.token = 'admin';
      return response;
    }
  },
  error => {
    console.log('err', error);// for debug
    return Promise.reject(error);
  }
)

export default service;
