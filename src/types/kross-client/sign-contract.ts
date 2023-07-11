import { FunctionResponse } from ".";
export type SignContractDto = {
  id: number;
}

export type SignContractResponseData = {
  id: string;
  userId: string;
  type: string;
  target: string;
  targetId: string;
  state: string;
  verificationCode: string;
  messageId: string,
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SignContractResponse = FunctionResponse<SignContractResponseData>;

export type SignContractVerificationDto = {
  id: number;
  verificationCode: string;
}

