import {Account} from './account';

export interface Wallet {
  id: number;
  name: string;
  accounts: Account[];
}
