import { base } from './base';
import { account } from './account';
import { investment } from './investment';
import { loan } from './loan';
import { user } from './user';
import { InquiryTest } from './inquiry';
import { verifications } from './verifications';
import { generalInfo } from './general-info';
import { signContractTest } from './sign-contract';

describe('Base test for login and updateToken', base);
describe('Account', account);
describe('Investment', investment);
describe('Loan', loan);
describe('user', user);
describe('Inquiry', InquiryTest);
describe('verifications', verifications);
describe('general-info', generalInfo);
describe('general-info', signContractTest);
