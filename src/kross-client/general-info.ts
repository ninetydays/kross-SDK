import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  DocTermsResponse,
  ArticlesResponse,
  GeneralInfoQuery,
} from '../types/kross-client/general-info';
export class GeneralInfo extends KrossClientBase {
  docTerms: FunctionRegistered<DocTermsResponse, GeneralInfoQuery>;
  articles: FunctionRegistered<ArticlesResponse, GeneralInfoQuery>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.docTerms = GeneralInfo.registerFunction<DocTermsResponse, GeneralInfoQuery>({
      url: '/doc-terms',
      method: 'get',
    });
    this.articles = GeneralInfo.registerFunction<ArticlesResponse, GeneralInfoQuery>({
      url: '/articles',
      method: 'get',
    });
  }

  useGeneralInfoHook() {
    return {
      docTerms: (docTermsQuery?: GeneralInfoQuery) => {
        return useQuery(
          'docTerms',
          async () => {
            return this.docTerms(docTermsQuery).then((res) => {
              return res.data;
            });
          },
        );
      },
      articles: (articles?: GeneralInfoQuery) => {
        return useQuery(
          'articles',
          async () => {
            return this.articles(articles).then((res) => {
              return res.data;
            });
          },
        );
      },
    };
  }
}
