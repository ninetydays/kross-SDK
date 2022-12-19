import { faker } from '@faker-js/faker';
const { internet, datatype } = faker;

export function getInvestmentId() {
  return datatype.number();
}

export function getUser() {
  return {
    member_no: datatype.number(),
    name: internet.userName(),
    is_corp: datatype.boolean(),
    keyid: internet.email(),
    corp_number: internet.email(),
    member_type: 'investor',
    user_id: datatype.number(),
    email: internet.email(),
    state: 'live',
  };
}