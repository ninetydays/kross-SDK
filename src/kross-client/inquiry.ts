import {
  InquiriesDto,
  InquiryDto,
  InquiryResponse,
  UpdateInquiryDto,
} from './../types/kross-client/inquiry';
import { KrossClientBase } from './base';
import { useMutation, useQuery, useInfiniteQuery } from 'react-query';
import { FunctionRegistered, KrossClientOptions } from '../types';

export class Inquiry extends KrossClientBase {
  createInquiry: FunctionRegistered<InquiryDto, InquiryResponse>;
  fetchInquiries: FunctionRegistered<InquiriesDto>;

  constructor(options: KrossClientOptions) {
    super(options);

    this.createInquiry = Inquiry.registerFunction<InquiryDto, InquiryResponse>({
      url: '/inquiries',
      method: 'post',
    });
    this.fetchInquiries = Inquiry.registerFunction<InquiriesDto>({
      url: '/inquiries',
      method: 'get',
    });
  }

  respondToInquiry(inquiryUpdate: UpdateInquiryDto) {
    return this.instance.put<InquiryResponse>(
      `/inquiries/${inquiryUpdate.inquiryId}`,
      inquiryUpdate
    );
  }

  useInquiriesHooks() {
    return {
      createInquiry: () => {
        const mutation = useMutation((inquiryDto: InquiryDto) =>
          this.createInquiry(inquiryDto)
        );
        return mutation;
      },
      fetchInquiries: (inquiriesDto: InquiriesDto) => {
        return useInfiniteQuery(
          'inquiries',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(inquiriesDto?.take as string, 10))
                ? 0
                : parseInt(inquiriesDto?.take as string, 10))
            ).toString();
            return this.fetchInquiries({
              ...inquiriesDto,
              skip,
            }).then((res) => {
              return res.data;
            });
          },
          {
            getNextPageParam: (lastPage, pages) => {
              return pages?.length >= 1 ? pages.length : null;
            },
          }
        );
      },
      respondToInquiry: () => {
        const mutation = useMutation((inqueryUpdate: UpdateInquiryDto) =>
          this.respondToInquiry(inqueryUpdate)
        );
        return mutation;
      },
    };
  }
}
