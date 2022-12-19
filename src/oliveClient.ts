import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const OLIVE_BASE_URL = 'http://olive-dev.kross.kr/'


const assignHeaders = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  return Promise.resolve(
    Object.assign({}, config, {
      headers: {
        ...config.headers,
      },
    })
  );
};

export default (config: AxiosRequestConfig): AxiosPromise => {
  const updatedConfig = Object.assign({ 'Content-Type': 'application/json' }, {...config, baseURL: OLIVE_BASE_URL });
  return assignHeaders(updatedConfig).then((configWithHeaders: AxiosRequestConfig) => axios(configWithHeaders));
};