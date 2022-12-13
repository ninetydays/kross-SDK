import oliveClient from '../../oliveClient';
import { AxiosRequestConfig } from 'axios';

export const getBorrowerAmount = async (authToken: string) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    headers: {
      authorization: `Bearer ${authToken}`,
    },
    url:'/users/borrower-amount',
  };
  const response = await oliveClient(config);
  return response.data;
};
