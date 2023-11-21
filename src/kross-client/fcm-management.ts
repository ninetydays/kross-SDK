import { KrossClientBase } from './base';
import {
  FCMQuery,
  FCMTokenCreationResponse,
  FCMTokenDto,
  FCMTokenResponse,
  FunctionRegistered,
  KrossClientOptions,
  UpdateFCMTokenDto,
} from '../types';
import { useMutation, useQuery } from 'react-query';

export class FCMManagement extends KrossClientBase {
  fcmTokens: FunctionRegistered<FCMTokenResponse, FCMQuery>;
  createFCMToken: FunctionRegistered<FCMTokenCreationResponse, FCMTokenDto>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.fcmTokens = FCMManagement.registerFunction<FCMTokenResponse, FCMQuery>(
      {
        url: '/fcm-tokens',
        method: 'get',
      }
    );
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

  tokenExist(deviceId: string) {
    return this.instance.get<FCMTokenCreationResponse>(
      `/fcm-tokens/${deviceId}/exists`
    );
  }

  useFCMTokenHook() {
    return {
      fcmTokens: (fcmQuery?: FCMQuery, enabled?: boolean) => {
        return useQuery(
          ['fcmtokens', { ...fcmQuery }],
          async () => {
            return this.fcmTokens(fcmQuery).then(res => {
              return res.data;
            });
          },
          {
            enabled: enabled !== undefined ? enabled : true,
          }
        );
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
      tokenExist: (deviceId: string) => {
        return useQuery(['fcmtokens', { deviceId }], async () => {
          return this.tokenExist(deviceId).then(res => {
            return res.data;
          });
        });
      },
    };
  }
}
