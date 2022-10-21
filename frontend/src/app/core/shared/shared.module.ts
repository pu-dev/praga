import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CurrencySelectComponent }   from '../components/currency-select/currency-select.component';
import { ReeSpinnerComponent }       from '../components/ree-spinner/ree-spinner.component';
import { TemplatePageComponent }     from '../components/template-page/template-page.component';
import { TemplateSubpageComponent }     from '../components/template-subpage/template-subpage.component';

import { AccountOpFormComponent }     from '../components/account-op-form/account-op-form.component';
import { AccountSelectComponent }     from '../components/account-select/account-select.component';
import { AccountTypeSelectComponent } from '../components/account-type-select/account-type-select.component';

import { NumberInputComponent }      from '../components/number-input/number-input.component';
import { ClosingPriceInfoComponent } from '../components/closing-price-info/closing-price-info.component';
import { CurrencyRateInfoComponent } from '../components/currency-rate-info/currency-rate-info.component';
import { DateSelectComponent }       from '../components/date-select/date-select.component';
import { TestComponent }             from '../vis/test/test.component';


export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
}


@NgModule({
  imports: [
    // BrowserModule,
    ReactiveFormsModule,
    CommonModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule    
  ],

  declarations: [
    AccountOpFormComponent,
    AccountSelectComponent,
    AccountTypeSelectComponent,
    NumberInputComponent,
    ClosingPriceInfoComponent,
    CurrencyRateInfoComponent,
    CurrencySelectComponent,
    DateSelectComponent,
    ReeSpinnerComponent,
    TemplatePageComponent,
    TemplateSubpageComponent,
    TestComponent,
  ],
  
  exports: [
    ReactiveFormsModule,
    CommonModule,

    AccountOpFormComponent,
    AccountSelectComponent,
    AccountTypeSelectComponent,
    NumberInputComponent,
    ClosingPriceInfoComponent,
    CurrencyRateInfoComponent,
    CurrencySelectComponent,
    DateSelectComponent,
    ReeSpinnerComponent,
    TemplatePageComponent,
    TemplateSubpageComponent,
    TestComponent,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],

  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
   ]

})
export class SharedModule {}
