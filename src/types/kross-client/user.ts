import { FunctionResponse } from './index';
export type UserWengeQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type UserQueryDto = {
  fields?: string;
  offset?: string;
  limit?: string;
  sort_by?: string;
  group_by?: string;
  query?: Record<string, unknown>;
  include?: Record<string, unknown>;
};

export type UserUpdateDto = {
  password?: string;
  email?: string;
  name?: string;
  memberType?: string;
  kftcType?: string;
  state?: string;
  nickName?: string;
  mobile?: string;
  zip?: string;
  address1?: string;
  address2?: string;
  joinPath?: string;
  retireAt?: string;
  expireDate?: string;
  fdsExcept?: boolean;
  depositControl?: boolean;
  notifyOnNewProducts?: boolean;
  notifyOnRepayments?: boolean;
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

export type KFTCData = {
  guid: string;
  idcode: string;
  birth_bak: string;
  auth_expire: string;
  investor_code: string;
};
export type UserData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  memberNo: string;
  keyid: string;
  password: string;
  name: string;
  memberType: string;
  state: string;
  nickName: string | null;
  birthday: string;
  ssn: string;
  email: string;
  mobile: string;
  phoneVerified: boolean;
  idCardVerified: boolean;
  bankAccountVerified: boolean;
  zip: string;
  address1: string;
  address2: string;
  financialProvider: boolean;
  joinPath: string | null;
  data?: KFTCData;
  retireAt: string | null;
  isCorp: boolean;
  kftcType: string;
  guid: string;
  fdsExcept: boolean;
  depositControl: boolean;
  notifyOnNewProducts: boolean;
  notifyOnRepayments: boolean;
};

export type UserResponseData = UserData[];

export type UserUpdateResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  memberNo: string;
  keyid: string;
  password: string;
  name: string;
  memberType: string;
  state: string;
  nickName: string | null;
  birthday: string;
  ssn: string;
  email: string;
  mobile: string;
  phoneVerified: boolean;
  idCardVerified: boolean;
  bankAccountVerified: boolean;
  zip: string;
  address1: string;
  address2: string;
  financialProvider: boolean;
  joinPath: string | null;
  data: KFTCData;
  retireAt: string | null;
  isCorp: boolean;
  kftcType: string;
  guid: string;
  fdsExcept: boolean;
  depositControl: boolean;
  notifyOnNewProducts: boolean;
  notifyOnRepayments: boolean;
};

export type UserResponse = UserResponseData;

export type UserAccountLogsData = {
  id: number;
  userId: number;
  saveDate: string;
  bankCode: string;
  accountNo: string;
  vBankCode: string;
  vAccountNo: string;
  amount: number;
  pendingWithdrawal: number;
  pendingInvestment: number;
  pendingEtc: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAccountLogsResponse = FunctionResponse<UserAccountLogsData>;

export type UserNoteLogsData = {
  id: number;
  userId: number;
  saveDate: string;
  noteCount: number;
  principal: number;
  repaidPrincipal: number;
  remainPrincipal: number;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type UserNoteLogsResponse = FunctionResponse<UserNoteLogsData>;

export type TotalAssetsType = {
  [key: string]: {
    totalAssets: number;
  };
}

export type IdCardVerificationsDto = {
  idType?: string;
  driverNo?: string;
  issueDate?: string;
  juminNo1?: string;
  juminNo2?: string;
  userName: string;
  issueNo1: string;
  issueNo2: string;
}

export type IdCardVerificationsResponseData = {
  success: boolean;
  message: string;
  error_code: string;
  transaction_id: string;
  _v: number;
}

export type IdCardVerificationsResponse = FunctionResponse<IdCardVerificationsResponseData>;

export type IdOcrVerificationsDto = {
  imageForm: FormData;
  isForeigner: boolean;
}
export type IdOcrVerificationsResponseData = {
  data: Record<string, unknown>;
  success: boolean;
  message: string;
  error_code: string;
  transaction_id: string;
  _v: number;
}

export type IdOcrVerificationsResponse = FunctionResponse<IdOcrVerificationsResponseData>;

export type UseBTokenDto = {
  email: string;
  password: string;
}

export type UseBTokenResponseData = {
  success: boolean;
  message: string;
  jwt: string;
  expires_in: Date;
  transaction_id: string;
}

export type UseBTokenResponse = FunctionResponse<UseBTokenResponseData>;