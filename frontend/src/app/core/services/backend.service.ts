import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

import { ConfigService } from './config.service';
import { AccountType }     from '../data-types/account-type';


@Injectable({
  providedIn: 'root'
})

export class BackendService {
  
  constructor(
    private config: ConfigService,
    private apollo: Apollo,
    private http: HttpClient
  ) {}


  getNavItems(): any {
    const query = `
      navItems {
        id
        title
        order
      }
    `;

    return this.queryGraphql(query);
  }


  // Ex Assets
  //
  getExAssets(): any {
    const query = `
      assets {
        id
        name
        fullname
        exchange
      }`;

    return this.queryGraphql(query);
  }


  // Assets
  //

  getAssetsOnExchange(eid: string) {
    const query = `
      assetsOnExchange(eid: "${eid}") {
        id
        name
        fullname
        exchange {
          id
          eid
        }
      }
    `;
    return this.queryGraphql(query);
  }


  // Exchanges
  //
  getExchanges(): any {
    const query = `
      exchanges {
        id
        name
        eid
        currency
      }
      `;

    return this.queryGraphql(query);
  }

  getExchangesStock(): any {
    const query = `
      exchangesStock {
        id
        name
        eid
        currency
      }
      `;

    return this.queryGraphql(query);
  }

  // Accounts general
  //

  getAccounts(): any {
    const query = `
      accounts {
        id
        name
        type
        currency
        asset {
          id
          name
          exchange {
            eid
          }
        }
      }
    `;

    return this.queryGraphql(query);
  }

  createAccountStock(name: string, assetName: string, eid: string): any {
    const mutation = `
      createAccountStock(name:"${name}", assetName:"${assetName}", eid:"${eid}" ){
        account {
          id
        }
      }
    `;
    return this.mutateGraphql(mutation);
  }
  

  createAccountMoney(name: string, currency: string): any {
    const mutation = `
      createAccountMoney(name: "${name}", currency: "${currency}") {
        account {
          id
        }
      }
    `;

    return this.mutateGraphql(mutation);
  }

  createAccountCrypto(name: string, crypto: string): any {
    const mutation = `
      createAccountCrypto(name: "${name}", crypto: "${crypto}") {
        account {
          id
        }
      }
    `;

    return this.mutateGraphql(mutation);
  }

  deleteAccount(id: number) {
    const mutation = `
      deleteAccount(id: ${id}) {
        ok
      }
    `;

    return this.mutateGraphql(mutation); 
  }



  getAccountsBase(): any {
    const query = `
      accountsBase {
        accountId
        type
        name
      }
    `;

    return this.queryGraphql(query);
  }


  // Accounts
  //
  createAccount(assetId: number, name: string, currency: string, type: AccountType): any {
    const mutation = `
      createAccount(assetId: ${assetId}, name: "${name}", currency: "${currency}", type: "${type}") {
        account {
          id
        }
      }
    `;

    return this.mutateGraphql(mutation);
  }

  // Accounts Money
  //
  getAccountsMoney(): any {
    const query = `
      accountsMoney {
        id
        name
        currency
      }`;

    return this.queryGraphql(query);
  }




  deleteAccountMoney(id: number) {
    const mutation = `
      deleteAccountMoney(id: ${id}) {
        ok
      }
    `;

    return this.mutateGraphql(mutation); 
  }


  // Accounts Ex Asset
  //
  getAccountsExAsset(): any {
    const query = `
      accountsAssetExchange {
        id
        asset {
          id
          eid
          name
          globalname
          fullname
        }
      }`;

    return this.queryGraphql(query);
  }

  createAccountExAsset(assetId: number): any {
    const mutation = `
      createAccountAssetExchange(assetId: ${assetId}) {
        account {
          id
        }
      }
    `;

    return this.mutateGraphql(mutation);
  }

  deleteAccountExAsset(id: number) {
    const mutation = `
      deleteAccountAssetExchange(id: ${id}) {
        ok
      }
    `;

    return this.mutateGraphql(mutation); 
  }


  // Operations
  //
  getOperations() {
    const query = `
      operations {
        id
        account {
          id
          name
          type
          currency
        }
        dateTxt
        qtyChange
        cashflow
        note
      }
    `;

    return this.queryGraphql(query);
  }

  createOperation(
    accountId: number,
    date: string,
    cashflow: number,
    qtyChange: number,
    note: string
  ): any {
    const mutation = `
      createOperation(date: "${date}", accountId: ${accountId}, qtyChange: ${qtyChange}, cashflow: ${cashflow}, note: "${note}") {
        operation {
          id
        }
      }`;
    return this.mutateGraphql(mutation);
  }

  deleteOperation(id: number): any {
    const mutation = `
      deleteOperation(id: ${id}) {
        ok
      }`;
    return this.mutateGraphql(mutation);
  }


  // Transactions
  getTransactions() {
    const query = `
      transactions {
        id
        creditOp {
          id
          account {
            id
            name
            currency
            asset {
              id
              name
            }
          }
          qtyChange
          cashflow
          dateTxt
          note
        }
        debitOp {
          id
          account {
            id
            name
            currency
            asset {
              id
              name
            }
          }
          qtyChange
          cashflow
          dateTxt
          note
        }
      }
    `;

    return this.queryGraphql(query);
  }
  
  createTransaction(
    date: string,

    debit_accountId: number,
    debit_cashflow: number,
    debit_qtyChange: number,

    credit_accountId: number,
    credit_cashflow: number,
    credit_qtyChange: number,

  ): any {
    if (debit_cashflow > 0) {
      debit_cashflow = -debit_cashflow;
    }
    if (debit_qtyChange > 0) {
      debit_qtyChange = -debit_qtyChange;
    }
    if (credit_cashflow < 0) {
      credit_cashflow = -credit_cashflow;
    }
    if (credit_qtyChange < 0) {
      credit_qtyChange = -credit_qtyChange;
    }
    const mutation = `
      createTransaction(date: "${date}", opDebit: {accountId: ${debit_accountId}, qtyChange: ${debit_qtyChange}, cashflow: ${debit_cashflow}, note: ""}, opCredit: {accountId: ${credit_accountId}, qtyChange: ${credit_qtyChange}, cashflow: ${credit_cashflow}, note: ""}) {
        transaction {
          id
        }
      }
      `;

    return this.mutateGraphql(mutation);
  }

   deleteTransaction(id: number): any {
    const mutation = `
      deleteTransaction(id: ${id}) {
        ok
      }`;

    return this.mutateGraphql(mutation);
  }

  // Wallets
  //
  getWallets() {
    const query = `
      wallets {
        id
        name
        accounts {
          id
          name
        }
      }`;
    return this.queryGraphql(query);
  }

  getWallet(id: number) {
    const query = `
      wallet(id: ${id}) {
        id
        name
        accounts {
          id
          name
        }
      }
      `;

    return this.queryGraphql(query);
  }

  createWallet(name: string): any {
    const mutation = `
      createWallet(name: "${name}") {
        wallet {
          id
        }
      }`;

    return this.mutateGraphql(mutation);
  }

  updateWallet(wallet_id: number, accounts: number[]): any {
    const mutation = `
      updateWallet(
        walletId: ${wallet_id}, 
        accountIds: [${accounts}]) 
      {
        wallet {
         id
        }
      }`;

    return this.mutateGraphql(mutation);
  }

  deleteWallet(wallet_id: number): any {
    const mutation = `
      deleteWallet(id: ${wallet_id}) {
        ok
      }`;

    return this.mutateGraphql(mutation);
  }

  
  // Curriencies
  //
  getCurriencies() {
    const query = `
      currencies {
        id
        code
        name
        symbol
      }`;

    return this.queryGraphql(query);
  }

  getCurrienciesFav() {
    const query = `
      currenciesFav {
        id
        code
        name
        symbol
      }`;

    return this.queryGraphql(query);
  }

  getCurrencyRate(currSrc: string, currDst: string, date: string) {
    const query = `
      currencyRate(
        currencySrc: "${currSrc}", 
        currencyDst: "${currDst}", 
        date: "${date}", 
      )
    `;

    return this.queryGraphql(query);
  }

  // FinTech
  getXirrWallets(dateOld: string, dateNew: string, currency: string) {
    const query = `
      xirrWallets(dateOld: "${dateOld}", dateNew: "${dateNew}", currency: "${currency}") {
        xirr
        walletId
      }
      `;

    return this.queryGraphql(query);
  }

  // xirrWallet(walletId: 2, dateOld: "20200101", dateNew: "20201231", currency: "PLN")

  getXirrRangeWallet(walletId: number, date: string, currency: string, daysRange: number) {
    const query = `
      xirrRangeWallet(walletId:${walletId}, date: "${date}", currency: "${currency}", daysRange: ${daysRange}) {
        xirr
        dateStart
        dateStop
      }

      `;

    return this.queryGraphql(query);
  }


  // User
  //
  // loginUser(username: string, password: string) {
  //   const query = `
  //     userLogin(username: "${username}", password: "${password}")
  //   `;

  //   return this.queryGraphql(query);
  // }

  loginUser(username: string, password: string) {
    return this.getJwtToken(username, password);
  }

  getJwtToken(username: string, password: string): Observable <any> {
    const mutation = `
      tokenAuth(username: "${username}", password: "${password}") {
        payload
        token
        refreshExpiresIn
      }`;

    let obs =  this.mutateGraphql(mutation);
    return obs;
  }

  logoutUser() {
    const query = `
      userLogout
    `;

    return this.queryGraphql(query);
  }

  createUser(username: string, password: string): any {
    const mutation = `
      createUser(username: "${username}", password: "${password}") {
        user {
          id
        }
      }
    `;

    return this.mutateGraphql(mutation);
  }


  // EOD
  //
  getAssetPrice(assetName: string, eid: string, date: string): any {
    const query = `
      eod(assetName: "${assetName}", eid: "${eid}", date: "${date}") {
        date
        priceOpen
        priceClose
        priceCloseAdjusted
      }
    `;

    return this.queryGraphql(query);
  }


  private queryGraphql(query: string) {
    console.log(query);
    return this.apollo.watchQuery({
      query: gql`{${query}}`,
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    });
  }

  private mutateGraphql(mutation: string) {
    console.log(`mutation{${mutation}}`)
    return this.apollo.mutate({
      mutation: gql`mutation{${mutation}}`
    });
  }

  private getUrl(url: string): string {
    let config = this.config.getConfig();
    return `${config.apiUrl}${url}`;
  }

  private requestErrorHandler(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return of(error as HttpErrorResponse);
  }
}
