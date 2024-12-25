export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: "ADMIN";
  profilePhoto: string;
  iat: number;
  exp: number;
}
