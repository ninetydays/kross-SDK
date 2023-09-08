import { KrossClientBase } from './base';
import {
  FCMTokenCreationResponse,
  FCMTokenDto,
  FCMTokenResponse,
  FunctionRegistered,
  KrossClientOptions,
  UpdateFCMTokenDto,
} from '../types';

export class FCMManagement extends KrossClientBase {
  fcmTokens: FunctionRegistered<FCMTokenResponse>;
  createFCMToken: FunctionRegistered<FCMTokenCreationResponse, FCMTokenDto>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.fcmTokens = FCMManagement.registerFunction<FCMTokenResponse>({
      url: '/fcm-tokens',
      method: 'get',
    });
    this.createFCMToken = FCMManagement.registerFunction<
      FCMTokenCreationResponse,
      FCMTokenDto
    >({
      url: '/fcm-tokens',
      method: 'post',
    });
  }

  updateFCMToken(fcmUpdateDto: UpdateFCMTokenDto) {
    return this.instance.put<FCMTokenCreationResponse>(
      `/fcm-tokens/${fcmUpdateDto.deviceId}`,
      fcmUpdateDto
    );
  }
}
