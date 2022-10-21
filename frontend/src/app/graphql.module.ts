import { NgModule } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { ConfigService } from './core/services/config.service';
import { SnackbarService } from './core/services/snackbar.service';


export function createApollo(
  httpLink: HttpLink,
  config: ConfigService,
  snackbar: SnackbarService,
 ) {

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null || token == "") {
      return {};
    } else {
      return {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
    }
  });
  

  const errorLink = onError(({ graphQLErrors, networkError /*, response, operation */}) => {
    if (graphQLErrors) {
      console.log("gl error");
      let msg = graphQLErrors[0].message;
      snackbar.error(msg);
    }

    if (networkError) {
      let err = networkError as HttpErrorResponse;
      let msg = `Network problem. ${err.statusText}`;
      snackbar.error(msg);
    }
  });

  const uri = `${config.getConfig().apiUrl}`;
  const link = ApolloLink.from([
    basic, 
    auth, 
    errorLink,
    httpLink.create({uri})
  ]);
  const cache = new InMemoryCache();

  return {
    link: link,
    cache: cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink, ConfigService, SnackbarService]
  }]
})
export class GraphQLModule {}
