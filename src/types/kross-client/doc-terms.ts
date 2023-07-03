import { FunctionResponse } from './index';

export type GeneralSuccess = {
  id: string;
  version: string;
  type: string;
  subject: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
}[];

export type GeneralFailure = {
  message: string;
  statusCode: number;
};

export type GeneralQuery = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type GeneralResponse = FunctionResponse<
  GeneralSuccess | GeneralFailure
>;
