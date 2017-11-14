import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
/*
  Generated class for the ChatAppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatAppProvider {
private obsMessages: Observable< Array<Message> >;
private users: BehaviorSubject< Array<User> >;
messages: Array<Object>;


/*
* Pour tout ce qui parle d'Observable ou "rxjs" cf la doc
* http://reactivex.io/rxjs/
*/
  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase) {

    const that = this;
    this.users = new BehaviorSubject([]);
    db.list('users').valueChanges().subscribe((users: Array<User>) => {
      that.users.next(users);
    });
    // [
    //   new User('Nom', 'nom@email.com'),
    //   new User('Moi', 'moi@email.com'),
    //   new User('Toi', 'toi@email.com'),
    // ];

    this.obsMessages = db.list('messages').valueChanges();
  }

  saveMessages(msg: Message) {
    this.db.list('messages').push(msg);

    console.log("sending message : ");
    console.log(msg);
  }

  messagesSubscribe( fct: (messages: Array<Message>) => void ) {
    this.obsMessages.subscribe(fct);
  }
  /* function supprimée et remplacée par un subscribe */
  // getMessages(): Array<Message> {
  //   return [
  //     new Message('text de test', new User("Name","Name@email.com")),
  //     new Message('autre texte', new User("Moi", "moi@email.com"))
  //   ]
  // }

  connect(user: User){
    // this.users.next(this.users.getValue().push(user));
        //C'est sensé être la bonne synthaxe mais ça bug, sait pas pourquoi, du coup on a remplacé cette ligne par les 3 autres
    // const c_array: Array<User> = this.users.getValue();
    // c_array.push(user);
    // this.users.next( c_array );
        // Suite à des améliorations j'ai du changer pleins de trucs
    this.db.list('users').push( user );
  }

  listUserSubscribe( fct: (data: Array<User>) => void ) {
    this.users.subscribe(fct);
  }

  getUsers(): Array<User> {
    return this.users.getValue();
  }

}
