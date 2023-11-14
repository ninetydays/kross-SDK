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
  CreateVerificationDto,
  CreateVerificationResponse,
} from '../types/kross-client/verifications';
import { KrossClientOptions, FunctionRegistered } from '../types';
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

  idCardVerification(idCardVerificationDto: IdCardVerificationsDto) {
    return this.instance.post<IdCardVerificationsResponse>(
      '/verifications/idcard',
      idCardVerificationDto
    );
  }
  idOcrVerification(idOcrVerificationsDto: IdOcrVerificationsDto) {
    return this.instance.post<IdOcrVerificationsResponse>(
      '/verifications/idcard/ocr',
      idOcrVerificationsDto,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );
  }
  useBToken(useBTokenDto: UseBTokenDto) {
    return this.instance.post<UseBTokenResponse>(
      '/verifications/useb/token',
      useBTokenDto
    );
  }

  createVerification(createVerificationDto: CreateVerificationDto) {
    return this.instance.post<CreateVerificationResponse>(
      '/verifications',
      createVerificationDto
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
          cacheTime: 0,
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
          (idCardVerificationDto: IdCardVerificationsDto) =>
            this.idCardVerification(idCardVerificationDto)
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
      createVerification: () => {
        const mutation = useMutation(
          (createVerificationDto: CreateVerificationDto) =>
            this.createVerification(createVerificationDto)
        );
        return mutation;
      },
    };
  }
}
