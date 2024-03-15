import { FunctionResponse } from '.';
import formData from 'form-data';
export type IdCardVerificationsDto = {
  idType?: string;
  driverNo?: string;
  issueDate?: string;
  juminNo1?: string;
  juminNo2?: string;
  userName: string;
  issueNo1: string;
  issueNo2: string;
};

export type VerificationsWengeDto = {
  select?: string;
  skip?: string;
  take?: string;
  order?: string;
  filter?: string;
  join?: string;
};

export type VerificationResponseData = {
  id: string;
  userId: string;
  type: string;
  certification: string;
  encodedData: Record<string, unknown>;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type VerificationsResponse = FunctionResponse<VerificationResponseData>;

export type IdCardVerificationsResponseData = {
  success: boolean;
  message: string;
  error_code: string;
  transaction_id: string;
  _v: number;
};

export type IdCardVerificationsResponse =
  FunctionResponse<IdCardVerificationsResponseData>;

export type IdOcrVerificationsDto = {
  image: formData;
};

export type IdOcrVerificationsResponseData = {
  data: string;
  success: boolean;
  message: string;
  error_code: string;
  transaction_id: string;
  _v: number;
};

export type IdOcrVerificationsResponse =
  FunctionResponse<IdOcrVerificationsResponseData>;

export type UseBTokenDto = {
  email: string;
  password: string;
};

export type UseBTokenResponseData = {
  success: boolean;
  message: string;
  jwt: string;
  expires_in: Date;
  transaction_id: string;
};

export type PhoneVerificationDto = {
  name?: string;
  phone?: string;
  birthdate?: string;
  type?: string;
};

export type PhoneVerificationResponseData = {
  data: Record<string, unknown>;
  okay: boolean;
  message: string;
};

export type EddVerificationDto = {
  address1: string;
  address2: string;
  zip: string;
  gender: string;
  transactionPurpose: string;
  job: string;
  fundingSource: string;
};

export type EddVerificationResponse = FunctionResponse<EddVerificationDto>;

export type PhoneVerificationResponse =
  FunctionResponse<PhoneVerificationResponseData>;
export type UseBTokenResponse = FunctionResponse<UseBTokenResponseData>;
