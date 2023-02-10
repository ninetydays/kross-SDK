import {
  InquiriesDto,
  InquiryDto,
  InquiryResponse,
} from './../types/kross-client/inquiry';
import { KrossClientBase } from './base';
import { useMutation, useQuery } from 'react-query';
import { FunctionRegistered, KrossClientOptions } from '../types';

export class Inquiry extends KrossClientBase {
  postInuiry: FunctionRegistered<InquiryDto, InquiryResponse>;
  getInquiries: FunctionRegistered<InquiriesDto>;

  constructor(options: KrossClientOptions) {
    super(options);

    this.postInuiry = Inquiry.registerFunction<InquiryDto, InquiryResponse>({
      url: '/inquiries',
      method: 'post',
    });
    this.getInquiries = Inquiry.registerFunction<InquiriesDto>({
      url: '/inquiries',
      method: 'get',
    });
  }

  useInquiriesHooks() {
    return {
      postInuiry: () => {
        const mutation = useMutation((inquiryDto: InquiryDto) =>
          this.postInuiry(inquiryDto)
        );
        return mutation;
      },
      getInquiries: (inquiriesDto: InquiriesDto) => {
        return useQuery({
          queryKey: 'inquiries',
          queryFn: async () => {
            return this.getInquiries(inquiriesDto).then((res) => {
              return res.data;
            });
          },
        });
      },
    };
  }
}
