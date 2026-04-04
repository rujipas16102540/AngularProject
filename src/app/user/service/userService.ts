import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../Interface/userInfo';
import { firstValueFrom } from 'rxjs';
import { UserServiceBehavior } from '../behavior/userBehaviorService';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private userServiceBehav: UserServiceBehavior,
  ) { }

  async getUsersByUsername(username: string) {
    let result: any;
    result = await firstValueFrom(this.http.get(this.apiUrl + '/findByUsername/' + username));
    console.log("result : ", result)
    this.userServiceBehav.setUser(result);
    return result;
  }


  async addUpdateUser(user: UserInfo) {
    let result = null;
    result = await firstValueFrom(this.http.post(this.apiUrl + '/addUpdateUserInfo', user, { responseType: 'text' }))
    return result;
  }

  async clearDataUser() {
    let result = null;
    result = await firstValueFrom(this.http.get(this.apiUrl + '/clearAll', { responseType: 'text' }))
    return result;
  }
}