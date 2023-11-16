import { KrossClientBase } from './base';
import {
  FCMTokenCreationResponse,
  FCMTokenDto,
  FCMTokenResponse,
  FunctionRegistered,
  KrossClientOptions,
  UpdateFCMTokenDto,
} from '../types';
import { useMutation, useQuery } from 'react-query';

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
    return this.instance.patch<FCMTokenCreationResponse>(
      `/fcm-tokens/${fcmUpdateDto.deviceId}`,
      fcmUpdateDto
    );
  }

  deleteFCMToken(deviceId: string) {
    return this.instance.delete<FCMTokenCreationResponse>(
      `/fcm-tokens/${deviceId}`
    );
  }

  useFCMTokenHook() {
    return {
      fcmTokens: () => {
        return useQuery(['fcmtokens'], async () => {
          return this.fcmTokens().then(res => {
            return res.data;
          });
        });
      },

      createFCMToken: () => {
        const mutation = useMutation((fcmTokenDto: FCMTokenDto) =>
          this.createFCMToken(fcmTokenDto)
        );
        return mutation;
      },

      updateFCMToken: () => {
        const mutation = useMutation((fcmTokenDto: UpdateFCMTokenDto) =>
          this.updateFCMToken(fcmTokenDto)
        );
        return mutation;
      },

      deleteFCMToken: () => {
        const mutation = useMutation((deviceId: string) =>
          this.deleteFCMToken(deviceId)
        );
        return mutation;
      },
    };
  }
}
