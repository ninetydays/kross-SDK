import { KrossClient } from 'kross-sdk';

type GetNotesResponse = {
  user_id: any; 
  state: any,
  limit: any,
  offset: any,
  sortBy: any,
};

export const getNoteList = async (data : GetNotesResponse) => {
    const orderBy = data.state === 'done' ? 'doneAt' : 'issueAt';
    const params = {
        orderBy,
        ...data
    };

    const client = new KrossClient({
        baseURL: process.env.REACT_APP_OLIVE_BASE_URL,
        accessId: data.user_id,
        secretKey: 'secretkey'
    })

    const resp = await client.get(`/user/${data.user_id}/notes`, {
        params,
    });
    return resp.data;
}