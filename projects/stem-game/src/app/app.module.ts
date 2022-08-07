import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/store/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { DisableButtonStyleDirective } from './shared/directives/disable-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DisableButtonStyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AuthEffects]),
    EffectsModule.forFeature([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
