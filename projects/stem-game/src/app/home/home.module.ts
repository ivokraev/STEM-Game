import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './content/welcome/welcome.component';
import { LoginComponent } from './content/auth/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './content/auth/signup/signup.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,

    SharedModule,
  ],

})
export class HomeModule { }
