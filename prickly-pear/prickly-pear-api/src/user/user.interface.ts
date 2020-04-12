export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
