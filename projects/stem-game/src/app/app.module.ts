import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';

import { AuthEffects } from './home/auth/store/effects/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

import * as fromApp from './store/app.reducer';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './home/auth/interceptor/auth.interceptor';
import { CoreModule } from './core.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    EffectsModule.forFeature([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'STEM Game' }),

    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
