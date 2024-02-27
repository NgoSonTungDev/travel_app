export interface IUser {
  _id?: string;
  codeOtp?: Number;
  userName: string;
  avt: string;
  email: string;
  password: string;
  numberPhone: string;
  address: string;
  gender: string;
  description: string;
  isAdmin: number;
  isLock: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IVerifyEmailRegister {
  email: string;
  userName: string;
}

export interface IRegister {
  codeOtp: string;
  email: string;
  password: string;
  userName: string;
}
export interface IUpdatePassword {
  userId: string;
  codeOtp: string;
  password: string;
}
