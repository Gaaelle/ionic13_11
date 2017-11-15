import { User } from './user.model';


export class Message {
  public date;
  public image = '';

  constructor(public text:string, public user: User) {
    this.date = Date.now();
  }
}
