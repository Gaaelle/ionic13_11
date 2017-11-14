import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ChatAppProvider} from '../../providers/chat-app/chat-app';
import { User } from '../../models/user.model';
import { ChatPage } from '../chat/chat';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: Array<User>;
  nb_users: number;
  buffer: Array<Object>;
  searchType: 'name' | 'email' = 'name';
  searchValue: string = '';

  constructor(
    public navCtrl: NavController,
    public alertModal: AlertController,
    public api: ChatAppProvider) {
      const that = this;
      this.users = api.getUsers();
      api.listUserSubscribe( function(users){
        that.nb_users = users.length;
      });
  }

  search() {
  this.users = this.api.getUsers().filter( (user) => {
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

  register(form: NgForm) {
    let user: User = new User(form.value.login, form.value.email);
    this.api.connect(user);
  }

  goToChat(form: NgForm) {
    let user: User = new User(form.value.login, form.value.email);
    this.navCtrl.push(ChatPage, {user: user});
  }

}
