import { UserDetails } from './../store/models/auth.model';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

export interface AuthResult {
  result: boolean;
  message: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user;

  constructor(private auth: AngularFireAuth) {}

  signIn(email, password): Promise<UserDetails> {
    return new Promise(resolve => {
      //LOGIN
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          this.user = res.user;
          console.log(this.user);
          if (this.user.uid != null) {
            if (this.isEmailVerified()) {
              resolve({
                result: true,
                message: "Logged in and Email Verified"
              });
            } else {
              resolve({ result: false, message: "Email Not Verified" });
            }
          } else {
            resolve({ result: false, message: "Login Error" });
          }
        })
        .catch(err => {
          resolve({
            result: false,
            message:
              "The password is invalid or the user does not have a password."
          });
        });
    });
  }

  register(email, password): Promise<AuthResult> {
    return new Promise(resolve => {
      //REGISTER USER
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          this.user = res.user;
          if (this.user.uid != null) {
            this.sendVerificationMail();
            resolve({
              result: true,
              message: "Registration Successful! Please check your email."
            });
          } else {
            resolve({ result: false, message: "Registration Error" });
          }
        })
        .catch(err => {
          console.log(err.message);
          resolve({ result: false, message: err.message });
        });
    });
  }

  isEmailVerified() {
    return this.user.emailVerified;
  }

  sendVerificationMail() {
    this.auth.user.subscribe(currentUser => {
      currentUser.sendEmailVerification();
    });
  }
}
