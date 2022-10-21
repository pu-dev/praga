import {AccountTypes} from './account-types';

export interface AccountBase {
  accountId: number;
  type: AccountTypes;
  name: string;
}
