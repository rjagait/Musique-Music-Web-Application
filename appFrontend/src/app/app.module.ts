import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { LibguestComponent } from "./libguest/libguest.component";
import { LibadminComponent } from "./libadmin/libadmin.component";
import { AuthService } from "./auth.service";
import { TokenInterceptorService } from "./token-interceptor.service";
import { AdminEventsService } from "./libadmin/admin-events.service";
import { LibsecureComponent } from "./libsecure/libsecure.component";
import { SecureEventsService } from "./libsecure/secure-events.service";

import { Config } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LibguestComponent,
    LibadminComponent,
    LibsecureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(Config.angularfire_config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AdminEventsService,
    SecureEventsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
