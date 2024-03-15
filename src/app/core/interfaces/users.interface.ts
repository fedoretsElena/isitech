export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType;
}

export interface UpdateUser extends User {
  password2: string;
}

export enum UserType {
  Admin = 'Admin',
  Driver = 'Driver',
}

export const userTypeToUIMapper: { [key in UserType]: string } = {
  [UserType.Admin]: 'Administrator',
  [UserType.Driver]: 'Driver',
};
