import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserData } from '../models/user.model';




@Injectable()
export class UserService {

  USERS:UserData[] = [
    {
      id: 1,
      email: "test1@gmail.com",
      access: "User",
      status: "Enable",
      date: 'Sat May 27 2023 00:51:41 GMT+0330'

    },
    {
      id: 2,
      email: "test2@gmail.com",
      access: "User",
      status: "Enable",
      date: 'Sat May 27 2023 00:51:41 GMT+0330'
    },
    {
      id: 3,
      email: "test3@gmail.com",
      access: "User",
      status: "Enable",
      date: 'Sat May 27 2023 00:51:41 GMT+0330'
    },
    {
      id: 4,
      email: "test4@gmail.com",
      access: "User",
      status: "Enable",
      date: 'Sat May 27 2023 00:51:41 GMT+0330'
    },
    {
      id: 5,
      email: "test5@gmail.com",
      access: "User",
      status: "Enable",
      date: 'Sat May 27 2023 00:51:41 GMT+0330'
    },
  ]
  constructor() { }

  getUser():Observable<UserData[]>{
    return of(this.USERS);
  }

  createBulk(item:any){
    const newUser=Array.from({length: item.count}, (_, k) => createUser(item,this.USERS.length+k));
    this.USERS=this.USERS.concat(newUser);
  }
  editUser(user:UserData){
    this.USERS.map(item=>{
      if(item.id===user.id){
        item.email=user.email;
        item.access=user.access,
        item.status=user.status
      }
    })
  }
}
function createUser(item: any, id: number): UserData {
  return {
    id: id,
    email: item.email,
    access: item.access,
    status: item.status ,
    date: Date.now().toString()
  };
}

