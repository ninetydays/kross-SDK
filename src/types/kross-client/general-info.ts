import { FunctionResponse } from './index';

export type DocTermsSuccess = {
  id: string;
  version: string;
  type: string;
  subject: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TodayStatsSuccess = {
  date: string;
  paidCount: number;
  paidAmount: number;
  loanAmount: number;
  investedCount: number;
  delayedless30Count: number;
  delayedless30Amount: number;
  delayedover30Count: number;
  delayedover30Amount: number;
  sellOffCount: number;
};

export type ArticleSuccess = {
  id: string;
  title: string;
  content: string;
  files: string[];
  type: string;
  status: string;
};

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

export type ArticlesResponse = FunctionResponse<
  ArticleSuccess[] | GeneralInfoFailure
>;

export type DocTermsResponse = FunctionResponse<
  DocTermsSuccess[] | GeneralInfoFailure
>;

export type TodayStatsResponse = FunctionResponse<
  TodayStatsSuccess | GeneralInfoFailure
>;
