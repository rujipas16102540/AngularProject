import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/userService';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInfo, UserInfoObj } from '../../Interface/userInfo';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-user-main',
  imports: [ReactiveFormsModule],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  users: any
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: [''],
      nickname: [''],
      firstName: [''],
      lastName: [''],
      position: [''],
      nationality: [''],
      phone: [''],
      startDate: [''],
      address: [''],
      subDistrict: [''],
      district: [''],
      province: [''],
      postalCode: [''],
      facebook: [''],
      lineId: [''],
      instagram: [''],
    });

  }

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.users = await firstValueFrom(this.userService.getUsers());
    console.log("users : ", this.users);
  }

  async addEducation() {
    console.log("addEducation");
  }

  async addExperience() {
    console.log("addExperience");
  }

  async addSkill() {
    console.log("addSkill");
  }

  async addInterest() {
    console.log("addInterest");
  }

  async addGuild() {
    console.log("addGuild");
  }

  async saveUserInfo() {
    let userInfo:  UserInfo = UserInfoObj.UserInfo();
    userInfo = this.form.value;
    console.log(userInfo);
    const res = await this.userService.addUpdateUser(userInfo);
    if (res === 'Save Success') {
      alert('Save success');
    }

  }

  async clearData() {
    const res = await this.userService.clearDataUser();
    if (res === 'Clear Success') {
      alert('Clear Success');
    }
  }
}
