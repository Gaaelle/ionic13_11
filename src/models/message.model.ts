import { User } from './user.model';


export class Message {
  public date;

  constructor(public text:string, public user: User) {
    this.date = Date.now();

  }
}
