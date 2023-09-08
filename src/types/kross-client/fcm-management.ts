import { FunctionResponse } from '.';

export type FCMTokenSuccess = {
  id: number;
  token: string;
  deviceId: string;
  deviceType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type FCMTokenFailure = {
  message: string;
  statusCode: number;
};

export type FCMTokenResponse = FunctionResponse<
  FCMTokenSuccess[] | FCMTokenFailure
>;

export type FCMTokenDto = {
  token: string;
  deviceId: string;
  deviceType: string;
};

export type FCMTokenCreationResponse = FunctionResponse<
  FCMTokenSuccess | FCMTokenFailure
>;

export type UpdateFCMTokenDto = {
  deviceId: string;
  token: string;
  deviceType: string;
};
