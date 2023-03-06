import { FunctionResponse } from ".";
import formData from 'form-data'
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
  formData: formData;
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

export type PhoneVerificationDto = {
  name: string;
  phone: string;
  birthdate: string;
}

export type PhoneVerificationResponseData = {
  data: Record<string, unknown>;
  okay: boolean;
  message: string;
}

export type PhoneVerificationResponse = FunctionResponse<PhoneVerificationResponseData>;
export type UseBTokenResponse = FunctionResponse<UseBTokenResponseData>;