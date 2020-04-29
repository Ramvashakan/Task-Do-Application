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
  rootPage:any ;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public aFA: AngularFireAuth) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.aFA.authState.subscribe(res =>{

      if(res && res.uid){
        this.rootPage = MainPage;
        console.log("logged in");
      }
      else{
        console.log("not logged in");
        this.rootPage = HomePage;

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

