import { KrossClientBase } from './base';
import { useMutation, useQuery } from 'react-query';
import {
  SignContractResponse,
  SignContractDto,
  SignContractVerificationDto,
} from '../types';

export class SignContract extends KrossClientBase {
  getSignContract({id}: SignContractDto) {
    console.log("IDIDIDID", id);
    return this.instance.get<SignContractResponse>(
      `/signs/${id}`,
    );
  }
  signContractVerification(signContractVerficarion: SignContractVerificationDto) {
    const {verificationCode, id} = signContractVerficarion;
    return this.instance.put<SignContractResponse>(
      `/signs/${id}/verification`,
      verificationCode,
    );
  }


  useSignContracts() {
    return {
      signContractVerification: () => {
        const mutation = useMutation(
          (verificationCode: SignContractVerificationDto) =>
            this.signContractVerification(verificationCode)
        );
        return mutation;
      },
      getSignContract: (id: SignContractDto) => {
        console.log("id: ", id);
        return useQuery({
          queryKey: 'signContract',
          queryFn: async () => {
            const getSignContractData: any = await this.getSignContract(id);
            return getSignContractData?.data;
          },
        });
      },
    };
  }
}
