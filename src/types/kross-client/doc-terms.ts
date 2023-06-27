import { FunctionResponse } from './index';

export type DocTermsSuccess = {
  id: string;
  version: string;
  type: string;
  subject: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
}[];

export type DocTermsFailure = {
  message: string;
  statusCode: number;
};

export type DocTermsQuery = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type DocTermsResponse = FunctionResponse<
  DocTermsSuccess | DocTermsFailure
>;
