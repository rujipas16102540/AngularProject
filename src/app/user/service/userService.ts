import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../Interface/userInfo';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return  this.http.get(this.apiUrl+'/all');
  }


  async addUpdateUser(user: UserInfo){
    let result = null ;
    result = await firstValueFrom(this.http.post( this.apiUrl + '/addUpdateUserInfo', user,  { responseType: 'text' }))
    return result;
  }

  async clearDataUser(){
    let result = null ;
    result = await firstValueFrom(this.http.get( this.apiUrl + '/clearAll',  { responseType: 'text' }))
    return result;
  }
}