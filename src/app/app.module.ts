import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripComponent } from './components/trip/trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActorComponent } from './components/actor/actor.component';
import { ApplicationComponent } from './components/application/application.component';
import { MasterComponent } from './components/master/master.component';
import { SecurityComponent } from './components/security/security.component';
import { LoginComponent } from './components/security/login/login.component';
import { MessageComponent } from './components/master/message/message.component';
import { HeaderComponent } from './components/master/header/header.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableComponent } from './components/translatable/translatable.component';
import { LocalizedDatePipe } from './components/shared/localized-data.pipe';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { HomeComponent } from './components/home/home.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCa_LIae-1skmlVsyWMtPEC8EqOVKkSkJA',
  authDomain: 'acme-explorer-fe.firebaseapp.com',
  databaseURL: 'https://acme-explorer-fe.firebaseio.com',
  projectId: 'acme-explorer-fe',
  storageBucket: 'acme-explorer-fe.appspot.com',
  messagingSenderId: '747409406368'
};

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TripComponent,
    ActorComponent,
    ApplicationComponent,
    MasterComponent,
    SecurityComponent,
    LoginComponent,
    MessageComponent,
    HeaderComponent,
    FooterComponent,
    TranslatableComponent,
    LocalizedDatePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //AngularFontAwesomeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // CollapseModule.forRoot(),
    // BsDropdownModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
