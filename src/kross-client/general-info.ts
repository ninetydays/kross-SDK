import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useMutation, useQuery } from 'react-query';
import {
  ContactUsDto,
  DocTermsResponse,
  ArticlesResponse,
  TodayStatsResponse,
  GeneralInfoQuery,
  ContactUsReponse,
} from '../types/kross-client/general-info';
export class GeneralInfo extends KrossClientBase {
  docTerms: FunctionRegistered<DocTermsResponse, GeneralInfoQuery>;
  articles: FunctionRegistered<ArticlesResponse, GeneralInfoQuery>;
  todayStats: FunctionRegistered<TodayStatsResponse>;
  contactUs: FunctionRegistered<ContactUsReponse, ContactUsDto>;
  constructor(options: KrossClientOptions) {
    super(options);
    this.docTerms = GeneralInfo.registerFunction<
      DocTermsResponse,
      GeneralInfoQuery
    >({
      url: '/doc-terms',
      method: 'get',
    });
    this.articles = GeneralInfo.registerFunction<
      ArticlesResponse,
      GeneralInfoQuery
    >({
      url: '/articles',
      method: 'get',
    });
    this.todayStats = GeneralInfo.registerFunction<TodayStatsResponse>({
      url: '/today-stats',
      method: 'get',
    });
    this.contactUs = GeneralInfo.registerFunction<ContactUsReponse, ContactUsDto>({
      url: '/contact-us',
      method: 'post',
    });
  }

  useGeneralInfoHook() {
    return {
      docTerms: (docTermsQuery?: GeneralInfoQuery, enabled?: boolean) => {
        return useQuery(
          ['docTerms', { ...docTermsQuery }],
          async () => {
            return this.docTerms(docTermsQuery).then((res) => {
              return res.data;
            });
          },
          {
            enabled: enabled !== undefined ? enabled : true,
          }
        );
      },
      articles: (articles?: GeneralInfoQuery) => {
        return useQuery('articles', async () => {
          return this.articles(articles).then((res) => {
            return res.data;
          });
        });
      },
      todayStats: () => {
        return useQuery('todayStats', async () => {
          return this.todayStats().then((res) => {
            return res.data;
          });
        });
      },
      contactUs: () => {
        const mutation = useMutation((contactUsDto: ContactUsDto) =>
            this.contactUs(contactUsDto)
        );
        return mutation;
      },
    };
  }
}
