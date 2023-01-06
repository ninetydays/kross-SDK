import { KrossClientBase } from './base';
import { KrossClientOptions } from '../types';
import { Account } from './account';

export class KrossClient extends KrossClientBase {
  account: Account;
  constructor(options: KrossClientOptions) {
    super(options);
    this.account = new Account(options);
  }
}
