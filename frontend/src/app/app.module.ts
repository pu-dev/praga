import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from './graphql.module';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { NavBarMobileComponent } from './core/components/nav-bar-mobile/nav-bar-mobile.component';
import { SharedModule } from './core/shared/shared.module';
import { ViewGuestMainComponent } from './views/view-guest-main/view-guest-main.component';


// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DragDropModule } from '@angular/cdk/drag-drop';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        NavBarMobileComponent,
        ViewGuestMainComponent,
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        GraphQLModule,
        HttpClientModule,
        LayoutModule,

        SharedModule
    ],
    providers: [
        //
        // Start custom date picker layout
        //
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        // {
        //     provide: DateAdapter,
        //     useClass: MomentDateAdapter,
        //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        // },
        // {
        //     provide: MAT_DATE_FORMATS,
        //     useValue: DATE_FORMAT
        // },
        
        // End custom date picker layout
        //
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
