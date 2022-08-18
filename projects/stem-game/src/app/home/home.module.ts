import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './content/welcome/welcome.component';
import { LoginComponent } from './content/auth/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './content/auth/signup/signup.component';



@NgModule({
  declarations: [
    ContentComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    HomeRoutingModule,
    ReactiveFormsModule,

    SharedModule,
  ],

})
export class HomeModule { }
