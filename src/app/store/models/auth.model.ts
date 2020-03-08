export interface UserDetails {
    username: string;
    email: string;
    userType: string;
}

export interface UserAuthCredentials {
    email: string;
    password: string;
    username?: string;
}