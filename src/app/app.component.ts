import { MainPage } from './../pages/main/main';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any ;
  user: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public aFA: AngularFireAuth) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.aFA.authState.subscribe(res =>{

      
      if((res && res.uid && res.emailVerified) || (res && res.uid ) ){
        this.rootPage = MainPage;
        console.log("logged in");
        
      }
      else {
        
        this.rootPage = HomePage;
        console.log("not logged in");

      }

    })

  }
  
 async doSomething() {
    const user = await this.aFA.authState.pipe(first()).toPromise();
    if (user) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = MainPage;
   }
 }


}

