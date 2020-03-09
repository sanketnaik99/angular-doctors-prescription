export interface UserDetails {
    username: string;
    email: string;
    userType: string;
}

export interface RegistrationResult {
    result: boolean;
    message: string;
    user?: UserDetails
}


export interface UserAuthCredentials {
    email: string;
    password: string;
    username?: string;
    userType: string;
}