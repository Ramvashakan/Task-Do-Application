import { RegisterPage } from './../pages/register/register';
import { AngularFirestore } from 'angularfire2/firestore';
import { MainPage } from './../pages/main/main';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController, ItemOptions } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {  firebase } from './app.firebase.config';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule,AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase.fire),
    
    AngularFireDatabaseModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,RegisterPage
  ],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    AngularFireAuth,
    AlertController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
