import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { DisableButtonStyleDirective } from './directives/disable-button.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentBorderComponent } from './components/content-border/content-border.component';


@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    CookiesComponent,
    PageNotFoundComponent,
    ContentBorderComponent,

    DisableButtonStyleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ErrorComponent,
    ContentBorderComponent,
    HeaderComponent,
    CookiesComponent,
    ContentBorderComponent,

    DisableButtonStyleDirective,
  ]
})
export class SharedModule { }
