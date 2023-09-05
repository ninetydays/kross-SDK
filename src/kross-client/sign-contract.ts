import { KrossClientBase } from './base';
import { useMutation, useQuery } from 'react-query';
import {
  SignContractResponse,
  SignContractDto,
  SignContractVerificationDto,
  ContractDocumentDto,
  ContractDocumentResponse,
} from '../types';

export class SignContract extends KrossClientBase {
  getContractSign({ id }: SignContractDto) {
    return this.instance.get<SignContractResponse>(`/signs/${id}`);
  }
  getContractDocument({ document_id }: ContractDocumentDto) {
    return this.instance.get<ContractDocumentResponse>(
      `/documents/${document_id}`,
      {
        responseType: 'arraybuffer',
      }
    );
  }
  signContractVerification(
    signContractVerficarion: SignContractVerificationDto
  ) {
    const { verificationCode, id } = signContractVerficarion;
    return this.instance.put<SignContractResponse>(
      `/signs/${id}/verification`,
      { verificationCode: verificationCode }
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
      getContractSign: (id: SignContractDto) => {
        return useQuery(
          'getSignContract',
          async () => {
            const getSignContractData: any = await this.getContractSign(id);
            return getSignContractData?.data;
          },
          {
            cacheTime: 0,
            staleTime: 0,
          }
        );
      },
      getContractDocument: (
        document_id: ContractDocumentDto,
        enabled?: boolean
      ) => {
        return useQuery(
          'getContractDocument',
          async () => {
            const data: any = await this.getContractDocument(document_id);
            return data?.data;
          },
          {
            enabled: enabled !== undefined ? enabled : true,
            cacheTime: 0,
            staleTime: 0,
          }
        );
      },
    };
  }
}
