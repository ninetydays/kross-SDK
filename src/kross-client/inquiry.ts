import {
  InquiriesDto,
  InquiryDto,
  InquiryResponse,
  InquiryResponseData,
  UpdateInquiryDto,
} from './../types/kross-client/inquiry';
import { KrossClientBase } from './base';
import { useMutation, useQuery, useInfiniteQuery } from 'react-query';
import { FunctionRegistered, KrossClientOptions } from '../types';

export class Inquiry extends KrossClientBase {
  createInquiry: FunctionRegistered<InquiryResponse, InquiryDto>;
  fetchInquiries: FunctionRegistered<unknown, InquiriesDto>;

  constructor(options: KrossClientOptions) {
    super(options);

    this.createInquiry = Inquiry.registerFunction<InquiryResponse, InquiryDto>({
      url: '/inquiries',
      method: 'post',
    });
    this.fetchInquiries = Inquiry.registerFunction<unknown, InquiriesDto>({
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
      fetchInquiries: (inquiriesDto?: InquiriesDto) => {
        return useInfiniteQuery(
          'inquiries',
          async ({ pageParam = 0 }) => {
            const skip = (
              pageParam *
              (isNaN(parseInt(inquiriesDto?.take as string, 10))
                ? 0
                : parseInt(inquiriesDto?.take as string, 10))
            ).toString();
            const inquiriesData = await this.fetchInquiries({
              ...inquiriesDto,
              skip,
            });
            const inquiriesDataArray = (inquiriesData?.data ||
              []) as InquiriesDto[];
            return inquiriesDataArray;
          },
          {
            getNextPageParam: (lastPage, pages) => {
              if (lastPage.length === 0) {
                return null;
              }
              return pages?.length;
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

      respondedQueriesCount: () => {
        return useQuery({
          queryKey: 'respondedQueriesCount',
          queryFn: async () => {
            const inquiriesData = await this.fetchInquiries({});
            const inquiriesDataArray = (inquiriesData?.data || []) as [];
            const respondedQueriesCount = inquiriesDataArray.filter(
              (inquiry: InquiryResponseData) => inquiry?.state === 'done'
            ).length;
            return respondedQueriesCount;
          },
          cacheTime: 1000 * 60 * 60 * 24 * 30,
        });
      },
    };
  }
}
