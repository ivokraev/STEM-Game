import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { DisableButtonStyleDirective } from './directives/disable-button.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    ErrorComponent,
    CookiesComponent,
    HeaderComponent,
    PageNotFoundComponent,

    DisableButtonStyleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ErrorComponent,
    CookiesComponent,
    HeaderComponent,

    DisableButtonStyleDirective,
  ]
})
export class SharedModule { }
