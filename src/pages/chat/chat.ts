import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { NgForm } from '@angular/forms';
import { ChatAppProvider } from '../../providers/chat-app/chat-app';
import { DatePipe } from '@angular/common';
import { CameraProxy } from '../../providers/camera/camera';

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
  users: Array<User>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ChatAppProvider,
    private camera: CameraProxy) {

    const that = this;
    this.user = this.navParams.get('user');
    this.api.messagesSubscribe( (messages:Array<Message>) => {
      that.messages = messages;
    });
    this.api.listUserSubscribe((user: Array<User>) => {
      this.users = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(msgForm: NgForm) {
    let msg = new Message(msgForm.value.text, this.user);
    this.api.saveMessages(msg);
    msgForm.reset(); // clear le champs pour écrire les messages
  }

  takePicture() {
    this.camera.getPicture()
    .then(() => {
      console.log("OK");
    }).catch((err) => {
      console.log(err);
    });
  }

}
