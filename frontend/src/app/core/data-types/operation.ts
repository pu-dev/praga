import {Account} from './account';

export interface Operation {
  id: number;
  account: Account;
  dateTxt: string;
  qtyChange: number;
  cashflow: number;
  note: string;
}
