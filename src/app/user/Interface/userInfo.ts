import { Contack, ContackObj } from "./contack";
import { Education } from "./education";
import { Experience } from "./experience";
import { Guild } from "./guid";
import { Interest } from "./interest";
import { Skill } from "./skill";

export interface UserInfo {
  id: string;
  username: string;
  nickName: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  telephoneNumber: string;
  startingDate: Date;
  contack?: Contack;
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  interests?: Interest[];
  guilds?: Guild[];
  profileImage?: string;
  coverImage?: string;
}

export class UserInfoObj {
  static UserInfo(): UserInfo {
    return {
      id: '',
      username: '',
      nickName: '',
      firstName: '',
      lastName: '',
      position: '',
      nationality: '',
      telephoneNumber: '',
      startingDate: new Date(),
      contack: ContackObj.Contack(),
      educations: [],
      experiences: [],
      skills: [],
      interests: [],
      guilds: [],
      profileImage: '',
      coverImage: ''
    }
  }
}