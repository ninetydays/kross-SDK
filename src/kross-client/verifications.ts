import { DecryptionManager } from './../utils/decryptionManager';
import { KrossClientBase } from './base';
import { useMutation, useQuery } from 'react-query';
import {
  IdOcrVerificationsDto,
  IdOcrVerificationsResponse,
  IdCardVerificationsDto,
  IdCardVerificationsResponse,
  UseBTokenDto,
  UseBTokenResponse,
  PhoneVerificationDto,
  PhoneVerificationResponse,
  VerificationsWengeDto,
  VerificationsResponse,
  EddVerificationDto,
  EddVerificationResponse,
} from '../types/kross-client/verifications';
import { KrossClientOptions, FunctionRegistered } from '../types';
import { AsymEncrypter } from '@ninetydays/kross-utils/dist/encrypter';

export class Verifications extends KrossClientBase {
  verifications: FunctionRegistered<
    VerificationsResponse,
    VerificationsWengeDto
  >;

  constructor(options: KrossClientOptions) {
    super(options);

    this.verifications = Verifications.registerFunction<
      VerificationsResponse,
      VerificationsWengeDto
    >({
      url: '/verifications',
      method: 'get',
    });
  }

  idCardVerification(params: {
    idCardVerificationDto: IdCardVerificationsDto;
    encKey: string;
  }) {
    const { idCardVerificationDto, encKey } = params;
    const encrypter = new AsymEncrypter(encKey);

    const strigifiedData = JSON.stringify(idCardVerificationDto);
    const encryptedData = encrypter.encrypt(strigifiedData);
    return this.instance.post<IdCardVerificationsResponse>(
      '/verifications/idcard',
      { encryptedData }
    );
  }
  async idOcrVerification(idOcrVerificationsDto: IdOcrVerificationsDto) {
    try {
      const response = await this.instance.post<IdOcrVerificationsResponse>(
        '/verifications/idcard/ocr',
        idOcrVerificationsDto,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );

      if (response?.data?.data) {
        const data: string = response.data.data as unknown as string;

        const secret_key = data?.substring(0, 10);
        const enc = data?.substring(10);

        const decryptionManager = new DecryptionManager();

        const decryptedData = decryptionManager.decrypt(enc, secret_key); // Decrypt the response data

        response.data.data = decryptedData; // Replace the encrypted data with the decrypted data
        return response; // Return decrypted data
      } else {
        return {
          ...response,
          data: {
            ...response?.data,
            success: false,
          },
        };
      }
    } catch (error) {
      // Handle errors here
      console.error('Error in idOcrVerification:', error);
      throw error;
    }
  }
  useBToken(useBTokenDto: UseBTokenDto) {
    return this.instance.post<UseBTokenResponse>(
      '/verifications/useb/token',
      useBTokenDto
    );
  }

  phoneVerification(phoneVerificationDto: PhoneVerificationDto) {
    return this.instance.post<PhoneVerificationResponse>(
      '/verifications/phone',
      phoneVerificationDto
    );
  }

  eddVerification(eddVerificationDto: EddVerificationDto) {
    return this.instance.post<EddVerificationResponse>(
      '/verifications/user-detail',
      eddVerificationDto
    );
  }

  useVerificationHook() {
    return {
      verifications: (
        verificationsWengeDto: VerificationsWengeDto,
        enabled?: boolean
      ) => {
        return useQuery({
          enabled: enabled !== undefined ? enabled : true,
          queryKey: 'verifications',
          queryFn: async () => {
            const verificationData = await this.verifications(
              verificationsWengeDto
            );
            return verificationData;
          },
        });
      },
      idCardVerification: () => {
        const mutation = useMutation(
          (params: {
            idCardVerificationDto: IdCardVerificationsDto;
            encKey: string;
          }) => this.idCardVerification(params)
        );
        return mutation;
      },
      idOcrVerification: () => {
        const mutation = useMutation(
          (idOcrVerificationDto: IdOcrVerificationsDto) =>
            this.idOcrVerification(idOcrVerificationDto)
        );
        return mutation;
      },
      useBToken: () => {
        const mutation = useMutation((useBTokenDto: UseBTokenDto) =>
          this.useBToken(useBTokenDto)
        );
        return mutation;
      },
      phoneVerification: () => {
        const mutation = useMutation(
          (phoneVerificationDto: PhoneVerificationDto) =>
            this.phoneVerification(phoneVerificationDto)
        );
        return mutation;
      },
      eddVerification: () => {
        const mutation = useMutation((eddVerificationDto: EddVerificationDto) =>
          this.eddVerification(eddVerificationDto)
        );
        return mutation;
      },
    };
  }
}
