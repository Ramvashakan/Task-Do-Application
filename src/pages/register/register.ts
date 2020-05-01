import { MainPage } from './../main/main';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: any;
  pass: any;
  phone: any;
  
  reCaptcha: firebase.auth.RecaptchaVerifier;
  phnNumber: any;
  appVerifier: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AFAuth: AngularFireAuth,
    public AlrtCtrl: AlertController,
    public LoadCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.reCaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }



  register(user, pass){
    
    this.AFAuth.auth.createUserWithEmailAndPassword(user,pass).then(
      (res) =>{
        if(!user.emailVerified){
          this.sendEmailVerification()
          let load = this.LoadCtrl.create({
            content: 'Account is been created',
            duration: 2000
          });
         load.present();

          let alert = this.AlrtCtrl.create({
          title: 'Verify',
          message: 'The verification is send to your mail ',
          buttons: ['OK']
          });
          alert.present(); 
        }
        else{

          let alert = this.AlrtCtrl.create({
            title: 'Verify',
            message: 'The verification is already send to your mail ',
            buttons: ['OK']
            });
            alert.present(); 

        }
      }).catch(
        err =>{
          let load = this.LoadCtrl.create({
            content: 'Please Wait',
            duration: 2000
          });
         load.present();

        let alert = this.AlrtCtrl.create({
          title: 'Error',
          message: 'The mail is already in use ',
          buttons: ['OK']
         });
        alert.present(); 
        }
      );
    this.user = "";
    this.pass = "";

  }

  sendEmailVerification() {
    
    this.AFAuth.authState.subscribe(user => {
        user.sendEmailVerification()});
    
  }

 
}
