import {Operation} from './operation';

export interface Transaction {
  id: number;
  creditOp: Operation;
  debitOp: Operation;
}
