import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  GeneralInfoResponse,
  GeneralInfoQuery,
} from '../types/kross-client/general-info';
export class GeneralInfo extends KrossClientBase {
  docTerms: FunctionRegistered<GeneralInfoResponse, GeneralInfoQuery>;
  articles: FunctionRegistered<GeneralInfoResponse, GeneralInfoQuery>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.docTerms = GeneralInfo.registerFunction<GeneralInfoResponse, GeneralInfoQuery>({
      url: '/doc-terms',
      method: 'get',
    });
    this.articles = GeneralInfo.registerFunction<GeneralInfoResponse, GeneralInfoQuery>({
      url: '/articles',
      method: 'get',
    });
  }

  useDocTermsHook() {
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
        return useQuery(
          ['articles', { ...articles }],
          async () => {
            return this.docTerms(articles).then((res) => {
              return res.data;
            });
          },
        );
      },
    };
  }
}
