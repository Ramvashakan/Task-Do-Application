import { RegisterPage } from './../register/register';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any;
  pass: any;
  phone: any;


  reCaptcha: firebase.auth.RecaptchaVerifier;
  phnNumber: any;
  appVerifier: any;

  constructor(public navCtrl: NavController,
    public AFAuth: AngularFireAuth,
    public AlrtCtrl: AlertController,
    public LoadCtrl: LoadingController
    ) {

  }
  ionViewDidLoad() {
    
    this.reCaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }


  signIn(user, pass, phone){
  this.AFAuth.auth.signInWithEmailAndPassword(user,pass)
   .then( (user) => {

    if(user.emailVerified){ 
    this.navCtrl.setRoot(MainPage);
   }
   else{
    let alert = this.AlrtCtrl.create({
      title: 'Verify',
      message: 'Please Verify the email',
      buttons: ['OK']
  });
  alert.present(); 
   }}).
   catch(err => { 
    let alert = this.AlrtCtrl.create({
        title: 'Error in Login',
        message: 'Please check your login credentials Pls try again',
        buttons: ['OK']
    });
    alert.present(); 
});
}
  

  signinphn(phone){

    const appVerifier = this.reCaptcha;
    const phnNumber =  '+91' + phone;

    if(phnNumber.length < 10 || phnNumber == null){

      let alert = this.AlrtCtrl.create({
        title: 'Error',
        message: 'Enter the valid number',
        buttons: ['OK']
        });
        alert.present(); 
    }


    firebase.auth().signInWithPhoneNumber(phnNumber,appVerifier).
    then( confirmationResult =>{

      let prompt = this.AlrtCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(  auth  => {
                this.navCtrl.setRoot(MainPage);
                
              }).catch(function (error) {

              });
            }
          }
        ]
      });
      prompt.present();
    }).
    catch(
      err =>{

        let alert = this.AlrtCtrl.create({
          title: 'Verify',
          message: 'The verification sms is not send',
          buttons: ['OK']
          });
          alert.present(); 
      });
  }


  register(){
    this.navCtrl.push(RegisterPage);
  }

}
