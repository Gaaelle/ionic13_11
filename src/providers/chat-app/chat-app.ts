import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import User from '../../models/user.model';
/*
  Generated class for the ChatAppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatAppProvider {
private users: Array<User>;

  constructor() {
    this.users = [
      new User('Nom', 'nom@email.com'),
      new User('Moi', 'moi@email.com'),
      new User('Toi', 'toi@email.com'),
    ];
  }

  getUsers(): Array<User> {
    return this.users;
  }

}
