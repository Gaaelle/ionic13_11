import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { NgForm } from '@angular/forms';
import { ChatAppProvider } from '../../providers/chat-app/chat-app';
import { DatePipe } from '@angular/common';
import { CameraProxyProvider } from '../../providers/camera/camera';

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
  msg: Message;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ChatAppProvider,
    private camera: CameraProxyProvider) {

    const that = this;
    this.user = this.navParams.get('user');
    this.api.messagesSubscribe( (messages:Array<Message>) => {
      that.messages = messages;
    });
    this.api.listUserSubscribe((user: Array<User>) => {
      this.users = user;
    });
    this.msg = new Message('', this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(msgForm: NgForm) {
    this.msg.text = msgForm.value.text;
    this.api.saveMessages(this.msg);
    msgForm.reset(); // clear le champs pour écrire les messages
    this.msg = new Message('', this.user);
  }

  takePicture() {
    this.camera.getPicture()
    .then((image) => {
      this.msg.image = 'data:image/jpeg;base64,' + image;
      console.log(image);
    }).catch((err) => {
      console.log(err);
    });
  }

}
