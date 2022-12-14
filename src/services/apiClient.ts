import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

/**
 * Assigns headers (Authorization) to axios config
 *
 * @method assignHeaders
 *
 * @param {AxiosRequestConfig} config
 *
 * @returns {Promise<AxiosRequestConfig>}
 */
export const assignHeaders = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  return Promise.resolve(
    Object.assign({}, config, {
      headers: {
        ...config.headers,
      },
    })
  );
};

/**
 * Wraps axios (http-client
 *
 * @param {AxiosRequestConfig}
 *
 * @returns {AxiosPromise}
 */
export default (config: AxiosRequestConfig): AxiosPromise => {
  const updatedConfig = Object.assign({ 'Content-Type': 'application/json' }, config);
  return assignHeaders(updatedConfig).then((configWithHeaders: AxiosRequestConfig) => axios(configWithHeaders));
};
