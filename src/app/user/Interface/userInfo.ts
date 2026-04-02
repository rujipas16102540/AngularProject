export interface UserInfo {
  id?: string;
  username: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  position: string;
  nationality: string;
  telephone_number: string;
  starting_date: Date;
  address: string;
  sub_district: string;
  district: string;
  province: string;
  postal_code: string;
  facebook: string;
  line_id: string;
  instagram: string;
}

export class UserInfoObj {
  static UserInfo(): UserInfo {
    return {
      id: '',
      username: '',
      nick_name: '',
      first_name: '',
      last_name: '',
      position: '',
      nationality: '',
      telephone_number: '',
      starting_date: new Date(),
      address: '',
      sub_district: '',
      district: '',
      province: '',
      postal_code: '',
      facebook: '',
      line_id: '',
      instagram: '',
    }
  }
}