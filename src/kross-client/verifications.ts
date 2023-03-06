import { KrossClientBase } from './base';
import { useMutation } from 'react-query';
import {
  IdOcrVerificationsDto,
  IdOcrVerificationsResponse,
  IdCardVerificationsDto,
  IdCardVerificationsResponse,
  UseBTokenDto,
  UseBTokenResponse,
  PhoneVerificationDto,
  PhoneVerificationResponse,
} from '../types/kross-client/verifications';

export class Verifications extends KrossClientBase {
 
  idCardVerification(idCardVerificationDto: IdCardVerificationsDto) {
    return this.instance.post<IdCardVerificationsResponse>(
      '/verifications/idcard',
      idCardVerificationDto,
    );
  }
  idOcrVerification({image, isForeigner}: IdOcrVerificationsDto) {
    console.log("image: ", image);
    console.log("Is foreigner: ", isForeigner);
    return this.instance.post<IdOcrVerificationsResponse>(
      '/verifications/idcard/ocr',
      {
        isForeigner,
        image,
      },
      {
        headers: {
           "Content-Type": "multipart/form-data" 
          },
      }
    );
  }
  useBToken(useBTokenDto: UseBTokenDto) {
    return this.instance.post<UseBTokenResponse>(
      '/verifications/useb/token',
      useBTokenDto,
    );
  }

  phoneVerification(phoneVerificationDto: PhoneVerificationDto) {
    return this.instance.post<PhoneVerificationResponse>(
      '/verifications/phone',
      phoneVerificationDto,
    );
  }

  useVerificationHook() {
    return {
      idCardVerification: () => {
        const mutation = useMutation(
          (idCardVerificationDto: IdCardVerificationsDto) =>
          this.idCardVerification(idCardVerificationDto));
        return mutation;
      },
      idOcrVerification: () => {
        const mutation = useMutation(
          (idOcrVerificationDto: IdOcrVerificationsDto) =>
          this.idOcrVerification(idOcrVerificationDto));
        return mutation;
      },
      useBToken: () => {
        const mutation = useMutation(
          (useBTokenDto: UseBTokenDto) =>
          this.useBToken(useBTokenDto));
        return mutation;
      },
      phoneVerification: () => {
        const mutation = useMutation(
          (phoneVerificationDto: PhoneVerificationDto) =>
          this.phoneVerification(phoneVerificationDto));
        return mutation;
      }
    };
  }
}
