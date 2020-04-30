import { firebase } from './../../app/app.firebase.config';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  newTask = {name: ''};
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  //rootPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public aFA: AngularFireAuth,
     public db:AngularFireDatabase,
     public LoadCtrl:LoadingController
     ){


       let a = aFA.auth.currentUser.uid;
       this.tasksRef = db.list(a);

        this.tasks = this.tasksRef.snapshotChanges().pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

     }

      ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signout(){
    
    this.aFA.auth.signOut().then(auth => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  updateTask(key, name){  

    this.tasksRef.update(key, {name: name});

  }

  removeTask(taskKey) {
    this.tasksRef.remove(taskKey);
  }

  addTask(newTask) {
    this.tasksRef.push(newTask);
    this.newTask = {name: ''};
  }

}
