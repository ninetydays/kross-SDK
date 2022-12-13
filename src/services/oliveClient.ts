import { AxiosPromise, AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';

export default (config: AxiosRequestConfig): AxiosPromise =>
  apiClient({ ...config, baseURL: process.env.REACT_APP_OLIVE_BASE_URL, });
