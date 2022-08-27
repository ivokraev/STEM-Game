import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './auth/signup/signup.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    HomeRoutingModule,

    SharedModule,
  ],

})
export class HomeModule { }
