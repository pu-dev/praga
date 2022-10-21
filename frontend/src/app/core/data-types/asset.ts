import {Exchange} from './exchange';

export interface Asset {
  id: number;
  name: string;
  fullname: string;
  exchange: Exchange;
}
