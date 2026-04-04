export interface Contack {
  id: string
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  facebook: string;
  lineId: string;
  instagram: string;
}

export class ContackObj {
  static Contack(): Contack {
    return {
      id: '',
      address: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
      facebook: '',
      lineId: '',
      instagram: '',
    }
  }
}