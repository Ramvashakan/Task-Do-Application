import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any;
  pass: any;

  constructor(public navCtrl: NavController,
    public AFAuth: AngularFireAuth,
    public AlrtCtrl: AlertController,
    public LoadCtrl: LoadingController
    ) {

  }
  
   register(user, pass){
    
    this.AFAuth.auth.createUserWithEmailAndPassword(user,pass). then(
      (res) =>{
        if(!user.emailVerified){
        this.sendEmailVerification()

       
       let alert = this.AlrtCtrl.create({
        title: 'Verify',
        message: 'The verification is send to your mail ',
        buttons: ['OK']
       });
      alert.present(); 
        
        }
      }).catch(
        err =>{

          let load = this.LoadCtrl.create({
            content: 'Please Wait',
            duration: 3000
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

  signIn(user, pass){
  
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

   }

   }).catch(err => { 
    let alert = this.AlrtCtrl.create({
        title: 'Error in Login',
        message: 'Please check your login credentials Pls try again',
        buttons: ['OK']
    });
    alert.present(); 
});
  }

  sendEmailVerification() {
    this.AFAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          let load = this.LoadCtrl.create({
            content: 'Please Wait',
            duration: 3000
          });
         load.present();

        })
      });
  }


}
