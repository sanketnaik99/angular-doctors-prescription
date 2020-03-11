export interface UserCredentials {
  email: string;
  password: string;
  username?: string;
  userType?: string;
  uid?: string;
}

export interface UserData {
  email: string;
  userType: string;
  username: string;
  uid: string;
}
