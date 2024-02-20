import { FunctionResponse, LoanResponseData } from './index';
export type UserWengeQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type UserNotesQueryDto = {
  state?: string;
  skip?: string;
  take?: string;
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

export type NoticeUsDto = {
  title: string;
  context: string;
};

export type NoticeUsResponseData = {
  success: true;
};

export type NotificationsResponseData = {
  id: number;
  type: 'string';
  content: 'string';
  status: 'string';
  userId: 'string';
  data: Record<string, unknown>;
  createdAt: 'string';
  updatedAt: 'string';
};

export type NoticeUsResponse = FunctionResponse<NoticeUsResponseData>;
export type NotificationsResponse = NotificationsResponseData[];

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
  consentToCollectMarketingInfo?: boolean;
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
  nationalityCode: string;
  documentState: string | null;
  eddVerified: boolean;
};

export type UserNotesData = {
  id: number;
  productId: number;
  productCode: string;
  applicantId: number;
  userId: number;
  memberId: number;
  amount: number;
  rate: number;
  feeRate: number;
  period: number;
  startAt: string;
  issueAt: string;
  returnAt: string;
  doneAt: Date;
  fundAmount: number;
  investedAmount: number;
  returnedAmount: number;
  expectedAmount: number;
  feeAmount: number;
  taxAmount: number;
  escrowAmount: number;
  guaranteeId: string;
  principal: number;
  interest: number;
  originPrincipal: number;
  state: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  loan?: LoanResponseData;
};

export type UserNotesResponse = FunctionResponse<UserNotesData>;

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

export type PasswordUpdateDto = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordUpdateResponse = UserResponse;

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

export type PasswordCheckDto = {
  password: string;
};

export type PasswordCheckResponseData = {
  message: string;
  statusCode: number;
};
export type PasswordCheckResponse = FunctionResponse<PasswordCheckResponseData>;

export type PasswordResetDto = {
  email: string;
};

export type PasswordResetNewDto = {
  password: string;
  token: string;
};

export type PasswordResetNewResponse = UserResponse;

export type PasswordResetResponseData = {
  name: string;
  email: string;
};

export type PasswordResetResponse = FunctionResponse<PasswordResetResponseData>;

export type PortfolioResponse = {
  totalAssetsAmount: number;
  totalTodayRepayment: number;
  totalTodayExpectAmount: number;
};

type SignedUrlSuccess = {
  url: string;
  okay: boolean;
  message: string;
};

type SignedUrlFail = {
  url: string;
  statusCode: number;
};

export type SignedUrlResponse = FunctionResponse<
  SignedUrlSuccess | SignedUrlFail
>;
export type NotificationResponse = FunctionResponse;

export type UserFilesResponse = {
  files: ['string'];
  okay: boolean;
  message: 'string';
};
export type CorporationDto = {
  corporationId: number;
  state: string;
};
export type getCorporationResponse = {
  id: string;
  userId: string;
  memberNo: string;
  businessNo: string;
  corpRegNo: string;
  chargeName: string;
  ceoName: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  state: string;
  chargeMobile: string;
};
export type getDepositReportResponse = {
  bankCode: number;
  accountNo: string;
  vAccountNo: number;
  totalAssetsAmount: number;
  notesAmount: number;
  totalExpectedReturn: number;
  depositsAmount: number;
  notes: any;
  businessNumber: string;
};
export type DepositReportQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
  date?: Date | string;
};

export type IndustryCodesResponseData = {
  code: string;
  name: string;
};

export type IndustryCodesResponse = FunctionResponse<
  IndustryCodesResponseData[]
>;
export type getSoldOffNotesResponse = {
  id: string;
  productId: string;
  productCode: string;
  applicantId: string;
  memberId: string;
  state: string;
  rate: number;
  feeRate: number;
  period: number;
  fundAmount: number;
  investedAmount: number;
  returnedAmount: number;
  expectedAmount: number;
  feeAmount: number;
  taxAmount: number;
  escrowAmount: number;
  principal: number;
  interest: number;
  originPrincipal: number;
  startAt: string;
  issueAt: string;
  returnAt: string;
  doneAt: string;
  createdAt: string;
  updatedAt: string;
};
export type SoldOffNotesQueryDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};
export type updateCorporationResponse = {
  corpRegNo: 'string';
  businessNo: 'string';
  chargeMobile: 'string';
  chargeName: 'string';
  ceoName: 'string';
  state: 'string';
  data: any;
};
