import oliveClient from '../../oliveClient';
import { AxiosRequestConfig } from 'axios';

  type GetNotesResponse = {
    user_id: number;
    state: any,
    limit: any,
    offset: any,
    sortBy: any,
  };

export const getNotes = async (data : GetNotesResponse) => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url:`/user/${data.user_id}/notes`,
        params: {
            ...data
        }
      };
    
    try {
      const response = await oliveClient(config);
        console.log(response);
        return response;
    } catch (error) {
      console.error(error);
    }
  }