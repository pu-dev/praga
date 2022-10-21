import {Asset} from './asset';
import {AccountType} from './account-type';

export interface Account {
  id: number;
  name: string;
  currency: string;
  asset: Asset;
  type: AccountType;
}
