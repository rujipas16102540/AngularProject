import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Interface/userInfo';

@Injectable({
    providedIn: 'root'
})
export class UserServiceBehavior {

    private userSubject = new BehaviorSubject<UserInfo | null>(null);
    user$ = this.userSubject.asObservable();

   

    //   private API = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient) { }

    // 🔹 set user (login / load)
    setUser(userInfo: UserInfo) {
        this.userSubject.next(userInfo);
    }

    // 🔹 get user (sync)
    getUser(): UserInfo | null {
        return this.userSubject.value;
    }

    //   // 🔹 call API get user
    //   getUserById(id: string): Observable<UserInfo> {
    //     return this.http.get<UserInfo>(`${this.API}/${id}`);
    //   }

    //   // 🔹 create user
    //   createUser(user: UserInfo): Observable<UserInfo> {
    //     return this.http.post<UserInfo>(this.API, user);
    //   }

    //   // 🔹 update user
    //   updateUser(userInfo: UserInfo): Observable<UserInfo> {
    //     return this.http.put<UserInfo>(this.API, userInfo);
    //   }

    //   // 🔹 clear user (logout)
    clearUser() {
        this.userSubject.next(null);
    }
}