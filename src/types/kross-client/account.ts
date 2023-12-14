import { FunctionResponse } from './index';
export type AccountCheckDto = {
  bankId: string;
  accountNumber: string;
  name: string;
};

export type AccountRegisterDto = {
  user_id?: number;
  corp_number?: string;
  email?: string;
  initial: boolean;
  bankId: string;
  accountNumber: string;
  name: string;
  consentToCollectMarketingInfo: boolean;
};

export type AccountVerifyDto = {
  code: string;
  user_id: number;
};

export type AccountCheckResponseData = {
  bankOwnerName: string;
  bankSearch: string;
  realBankOwnerName: string;
  tid: number;
};

export type AccountCheckResponse = FunctionResponse<AccountCheckResponseData>;

export type AccountRegisterResponseData = {
  memAccntno: string;
  tid: number;
};

export type AccountRegisterResponse =
  FunctionResponse<AccountRegisterResponseData>;

export type AccountVerifyResponseData = {
  memAccntno: string;
  tid: number;
};

export type AccountVerifyResponse =
  FunctionResponse<AccountRegisterResponseData>;

export type AccountWithdrawInitDto = {
  member_no: number;
  amount: number;
};

export type AccountWithdrawInitResponseData = {
  tid: number;
  verifyWord?: string;
};

export type AccountWithdrawInitResponse =
  FunctionResponse<AccountWithdrawInitResponseData>;

export type AccountWithdrawVerifyDto = {
  idempotency_key: string;
  verify_code: string;
};

export type AccountWithdrawVerifyResponseData = {
  wc_response: {
    tid: number;
    verifyWord: string;
  };
};

export type AccountWithdrawVerifyResponse =
  FunctionResponse<AccountWithdrawVerifyResponseData>;

export type AccountWithdrawCancelDto = {
  idempotency_key: string;
};

export type AccountWithdrawCancelResponse = FunctionResponse;
