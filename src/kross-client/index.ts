import { KrossClientBase } from './base';
import { KrossClientOptions } from '../types';
import { Account } from './account';
import { User } from './user';
import { Loans } from './loans';
import { Investments } from './investments';
import { Verifications } from './verifications';
import { Inquiry } from './inquiry';
import { GeneralInfo } from './general-info';
import { SignContract } from './sign-contract';
import { FCMManagement } from './fcm-management';
export class KrossClient extends KrossClientBase {
  verifications: Verifications;
  account: Account;
  user: User;
  investments: Investments;
  loans: Loans;
  inquiries: Inquiry;
  generalInfo: GeneralInfo;
  signContract: SignContract;
  FCMManagement: FCMManagement;
  constructor(options: KrossClientOptions) {
    super(options);
    this.account = new Account(options);
    this.user = new User(options);
    this.investments = new Investments(options);
    this.loans = new Loans(options);
    this.inquiries = new Inquiry(options);
    this.verifications = new Verifications(options);
    this.generalInfo = new GeneralInfo(options);
    this.signContract = new SignContract(options);
    this.FCMManagement = new FCMManagement(options);
  }
}

export {
  KrossClientBase,
  KrossClientOptions,
  Account,
  User,
  Loans,
  Investments,
  Verifications,
  Inquiry,
  GeneralInfo,
  SignContract,
  FCMManagement,
};
