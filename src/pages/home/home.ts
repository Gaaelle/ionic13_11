import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: Array<Object>;
  buffer: Array<Object>;
  searchType: 'name' | 'email' = 'name';
  searchValue: string = '';

  constructor(public navCtrl: NavController, public alertModal: AlertController) {
    this.users = new Array<Object>();

    this.users.push({ name: "Nom", email: "email@email.com" });
    this.users.push({ name: "moi", email: "moi@email.com" });
    this.users.push({ name: "toi", email: "toi@email.com" });

    this.buffer = this.users;

  }

  search() {
  this.users = this.buffer.filter( (user) => {
    let name = user[this.searchType].toLowerCase();
    return name.startsWith(this.searchValue);
    })
    if (this.users.length == 0) {
      this.alertModal.create( {
      title: 'Hum !',
      subTitle: 'Aucun utilisateur trouvé',
      buttons: ['ok']
      }).present();
      }
  }

}
