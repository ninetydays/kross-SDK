import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  GeneralResponse,
  GeneralQuery,
} from '../types/kross-client/doc-terms';
export class General extends KrossClientBase {
  docTerms: FunctionRegistered<GeneralResponse, GeneralQuery>;
  articles: FunctionRegistered<GeneralResponse, GeneralQuery>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.docTerms = General.registerFunction<GeneralResponse, GeneralQuery>({
      url: '/doc-terms',
      method: 'get',
    });
    this.articles = General.registerFunction<GeneralResponse, GeneralQuery>({
      url: '/articles',
      method: 'get',
    });
  }

  useDocTermsHook() {
    return {
      docTerms: (docTermsQuery?: GeneralQuery, enabled?: boolean) => {
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
      articles: (articles?: GeneralQuery) => {
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
