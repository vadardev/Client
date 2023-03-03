import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPage } from './pages/auth/auth.page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './common/services/error-handler.service';
import { EditCardPage } from './pages/edit-card/edit-card.page';
import { AddCardPage } from './pages/add-card/add-card.page';
import { ShowUserCardPage } from './pages/show-user-card/show-user-card.page';
import { FormsModule } from '@angular/forms';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [AppComponent, AuthPage, ShowUserCardPage, AddCardPage, EditCardPage],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, SocialLoginModule, HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7156", "bf67-146-185-235-232.eu.ngrok.io"],
        disallowedRoutes: []
      }
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('79728228386-m9ucpnsjit350pc00luej6dhju0let03.apps.googleusercontent.com')
        },
      ],
      onError: (err) => {
        console.error('err_message='+ err);
      }
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
