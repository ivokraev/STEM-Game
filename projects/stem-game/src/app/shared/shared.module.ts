import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { DisableButtonStyleDirective } from './directives/disable-button.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    ErrorComponent,
    CookiesComponent,

    DisableButtonStyleDirective,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorComponent,
    CookiesComponent,

    DisableButtonStyleDirective,
  ]
})
export class SharedModule { }
