import { FunctionResponse } from './index';

export type InquiryDto = {
  type: string;
  detail: string;
  response?: string;
  state: 'pending' | 'done';
};
export type InquiryResponseData = {
  id: string;
  userId: string;
  type: string;
  detail: string;
  response: string;
  createdAt: string;
  updatedAt: string;
  state: 'pending' | 'done';
};

export type InquiriesDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
};

export type UpdateInquiryDto = {
  inquiryId: string;
  response: string;
  state?: 'pending' | 'done';
};

export type InquiryResponse = FunctionResponse<InquiryResponseData>;
