import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/userService';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInfo, UserInfoObj } from '../../Interface/userInfo';
import { firstValueFrom } from 'rxjs';
import { UserServiceBehavior } from '../../behavior/userBehaviorService';


import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-main',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  users: UserInfo = UserInfoObj.UserInfo();
  userInfo: FormGroup;
  contack: FormGroup;
  educations: FormGroup;
  experiences: FormGroup;
  skills: FormGroup;
  interests: FormGroup;
  guilds: FormGroup;

  constructor(
    private userService: UserService,
    private userServiceBehav: UserServiceBehavior,
    private fb: FormBuilder
  ) {
    this.userInfo = this.fb.group({
      id: [null],
      username: [null],
      nickName: [null],
      firstName: [null],
      lastName: [null],
      position: [null],
      nationality: [null],
      telephoneNumber: [null],
      startingDate: [null],
    });

    this.contack = this.fb.group({
      id: [null],
      address: [null],
      subDistrict: [null],
      district: [null],
      province: [null],
      postalCode: [null],
      facebook: [null],
      lineId: [null],
      instagram: [null],
    });

    this.educations = this.fb.group({
      educations: this.fb.array([])
    });

    this.experiences = this.fb.group({
      experiences: this.fb.array([])
    });

    this.skills = this.fb.group({
      skills: this.fb.array([])
    });

    this.interests = this.fb.group({
      interests: this.fb.array([])
    });

    this.guilds = this.fb.group({
      guilds: this.fb.array([])
    });

  }

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    await this.userService.getUsersByUsername('admin');
    this.userServiceBehav.user$.subscribe(user => {
      if (user) {
        this.users = user;
        this.setDefaultUser(user);
      }
    });
  }

  async setDefaultUser(user: UserInfo) {
    if (user.startingDate) {
      const d = new Date(user.startingDate);
      const formattedDate = d.toISOString().split('T')[0];
      this.userInfo.patchValue({
        ...user,
        startingDate: formattedDate
      });
    } else {
      this.userInfo.patchValue(user);
    }

    if (user.contack) {
      this.contack.patchValue(user.contack);
    }

    // Clear and Fill Educations
    this.educationArray.clear();
    user.educations?.forEach(edu => {
      this.educationArray.push(this.fb.group({
        year: [edu.year],
        universityName: [edu.universityName]
      }));
    });

    // Clear and Fill Experiences
    this.experienceArray.clear();
    user.experiences?.forEach(exp => {
      this.experienceArray.push(this.fb.group({
        fromUntil: [exp.fromUntil],
        position: [exp.position]
      }));
    });

    // Clear and Fill Skills
    this.skillArray.clear();
    user.skills?.forEach(s => {
      this.skillArray.push(this.fb.group({
        name: [s.name],
        level: [s.level]
      }));
    });

    // Clear and Fill Interests
    this.interestArray.clear();
    user.interests?.forEach(i => {
      this.interestArray.push(this.fb.group({
        name: [i.name]
      }));
    });

    // Clear and Fill Guilds
    this.guildArray.clear();
    user.guilds?.forEach(g => {
      this.guildArray.push(this.fb.group({
        name: [g.name]
      }));
    });
  }

  get educationArray() {
    return this.educations.get('educations') as FormArray;
  }

  async addEducation() {
    const educationForm = this.fb.group({
      year: [null],
      universityName: [null],
    });
    this.educationArray.push(educationForm);
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  get experienceArray() {
    return this.experiences.get('experiences') as FormArray;
  }

  async addExperience() {
    const experienceForm = this.fb.group({
      fromUntil: [null],
      position: [null],
    });
    this.experienceArray.push(experienceForm);
  }

  removeExperience(index: number) {
    this.experienceArray.removeAt(index);
  }

  get skillArray() {
    return this.skills.get('skills') as FormArray;
  }

  async addSkill() {
    const skillForm = this.fb.group({
      name: [null],
      level: [5],
    });
    this.skillArray.push(skillForm);
  }

  removeSkill(index: number) {
    this.skillArray.removeAt(index);
  }

  get interestArray() {
    return this.interests.get('interests') as FormArray;
  }

  async addInterest() {
    const interestForm = this.fb.group({
      name: [null],
    });
    this.interestArray.push(interestForm);
  }

  removeInterest(index: number) {
    this.interestArray.removeAt(index);
  }

  get guildArray() {
    return this.guilds.get('guilds') as FormArray;
  }

  async addGuild() {
    const guildForm = this.fb.group({
      name: [null],
    });
    this.guildArray.push(guildForm);
  }

  removeGuild(index: number) {
    this.guildArray.removeAt(index);
  }

  onFileSelected(event: any, type: 'avatar' | 'cover') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'avatar') {
          this.users.profileImage = reader.result as string;
        } else {
          this.users.coverImage = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async saveUserInfo() {
    let userInfo: UserInfo = UserInfoObj.UserInfo();
    console.log(this.userInfo.value);

    userInfo = this.userInfo.value;
    userInfo.contack = this.contack.value;
    userInfo.educations = this.educations.value.educations;
    userInfo.experiences = this.experiences.value.experiences;
    userInfo.skills = this.skills.value.skills;
    userInfo.interests = this.interests.value.interests;
    userInfo.guilds = this.guilds.value.guilds;
    userInfo.profileImage = this.users.profileImage;
    userInfo.coverImage = this.users.coverImage;

    const res = await this.userService.addUpdateUser(userInfo);
    if (res === 'Save Success') {
      await this.loadUsers();
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
