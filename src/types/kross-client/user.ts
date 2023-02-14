import { FunctionResponse } from './index';

export type UserQueryDto = {
  fields?: string;
  offset?: string;
  limit?: string;
  sort_by?: string;
  group_by?: string;
  query?: Record<string, unknown>;
  include?: Record<string, unknown>;
};
export type kftcBalanceResponseData = {
  rsp_code: string;
  rsp_message: string;
  borrower_info: Record<string, unknown>;
  in_progress_result_info: Record<string, unknown>;
  complete_result_info: Record<string, unknown>;
};

export type kftcBalanceResponse = FunctionResponse<kftcBalanceResponseData>;

export type AccountCertificateReponseData = {
  url: string;
};

export type AccountCertificateResponse =
  FunctionResponse<AccountCertificateReponseData>;

export type VirtualAccountCheckResponseData = {
  insertDt: string;
  depoctlYn: string;
  useStatus: string;
  vaccntOwnerName: string;
  depoctlDepoBankAccNo: string;
};

export type VirtualAccountCheckResponse =
  FunctionResponse<VirtualAccountCheckResponseData>;

export type WelcomeUnregisterResponse = FunctionResponse;

export type ReleaseDepositResponseData = {
  vaccntNo: string;
};

export type ReleaseDepositResponse =
  FunctionResponse<ReleaseDepositResponseData>;

export type AccountResponseData = {
  available_withdraw_amount: number;
  amount: number;
  pending_withdrawal: number;
  pending_investment: number;
  pending_etc: number;
  impossible_withdraw_sub_deposit_amount: number;
  bank_code: string;
  account_no: string;
  v_account_no: string;
  v_bank_code: string;
};

export type AccountResponse = FunctionResponse<AccountResponseData>;

export type UserResponseData = {
  id: number;
  member_no: number;
  keyid: string;
  name: string;
  member_type: string;
  kftc_type: string;
  state: string;
  nick_name: string;
  email: string;
  mobile: string;
  address1: string;
  is_corp: boolean;
  phone_verified: boolean;
  id_card_verified: boolean;
  bank_account_verified: boolean;
  financial_provider: boolean;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type UserResponse = FunctionResponse<UserResponseData>;

export type UserAccountLogsData = {
  id: number;
  user_id: number;
  save_date: string;
  bank_code: string;
  account_no: string;
  v_bank_code: string;
  v_account_no: string;
  amount: number;
  pending_withdrawal: number;
  pending_investment: number;
  pending_etc: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAccountLogsResponse = FunctionResponse<UserAccountLogsData>;

export type UserNoteLogsData = {
  id: number;
  user_id: number;
  save_date: string;
  note_count: number;
  principal: number;
  repaid_principal: number;
  remain_principal: number;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type UserNoteLogsResponse = FunctionResponse<UserNoteLogsData>;

export type TotalAssetsType = {
  [key: string]: {
    totalAssets: number;
  };
};
