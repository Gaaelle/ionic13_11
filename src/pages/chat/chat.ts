import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { NgForm } from '@angular/forms';
import { ChatAppProvider } from '../../providers/chat-app/chat-app';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: User;
  messages: Array<Message>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ChatAppProvider) {

    this.user = this.navParams.get('user');
    this.api.messagesSubscribe( (messages:Array<Message>) => {
      this.messages = messages;
    });
    // this.messages = this.api.getMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(msgForm: NgForm) {
    let msg = new Message(msgForm.value.text, this.user);
    this.api.saveMessages(msg);
    msgForm.reset(); // clear le champs pour écrire les messages
  }

}
