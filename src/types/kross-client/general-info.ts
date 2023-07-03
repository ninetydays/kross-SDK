import { FunctionResponse } from './index';

export type GeneralInfoSuccess = {
  id: string;
  version: string;
  type: string;
  subject: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
}[];

export type GeneralInfoFailure = {
  message: string;
  statusCode: number;
};

export type GeneralInfoQuery = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type GeneralInfoResponse = FunctionResponse<
  GeneralInfoSuccess | GeneralInfoFailure
>;
