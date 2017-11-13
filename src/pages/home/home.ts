import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: Array<Object>;
  searchType: 'name' | 'email' = 'name';
  searchValue: string = '';

  constructor(public navCtrl: NavController) {
    this.users = new Array<Object>();

    this.users.push({ name: "Nom", email: "email@email.com" });
    this.users.push({ name: "moi", email: "moi@email.com" });
    this.users.push({ name: "toi", email: "toi@email.com" });

  }

  search() {
  this.users = this.users.filter( (user) => {
    let name = user[this.searchType].toLowerCase();
    return name.startsWith(this.searchValue.toLowerCase());
    })
  }

}
