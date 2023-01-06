import { FunctionResponse } from './index';
export type AccountCheckDto = {
  bankId: string;
  accountNumber: string;
  name: string;
};

export type AccountCheckResponseData = {
  bankOwnerName: string;
  bankSearch: string;
  realBankOwnerName: string;
  tid: number;
};

export type AccountCheckResponse = FunctionResponse<AccountCheckResponseData>;

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
