import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { useQuery } from 'react-query';
import {
  DocTermsResponse,
  DocTermsQuery,
} from '../types/kross-client/doc-terms';
export class DocTerms extends KrossClientBase {
  docTerms: FunctionRegistered<DocTermsResponse, DocTermsQuery>;

  constructor(options: KrossClientOptions) {
    super(options);
    this.docTerms = DocTerms.registerFunction<DocTermsResponse, DocTermsQuery>({
      url: '/doc-terms',
      method: 'get',
    });
  }

  useDocTermsHook() {
    return {
      docTerms: (docTermsQuery?: DocTermsQuery) => {
        return useQuery(['docTerms', { ...docTermsQuery }], async () => {
          return this.docTerms(docTermsQuery).then((res) => {
            return res.data;
          });
        });
      },
    };
  }
}
