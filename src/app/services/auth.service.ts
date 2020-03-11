import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/firestore";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface AuthResult {
  result: boolean;
  message: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}

  register(credentials) {
    return this.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  // signIn(email, password): Promise<UserDetails> {
  //   return new Promise(resolve => {
  //     //LOGIN
  //     this.auth
  //       .signInWithEmailAndPassword(email, password)
  //       .then(res => {
  //         this.user = res.user;
  //         console.log(this.user);
  //         if (this.user.uid != null) {
  //           if (this.isEmailVerified()) {
  //             resolve({
  //               result: true,
  //               message: "Logged in and Email Verified"
  //             });
  //           } else {
  //             resolve({ result: false, message: "Email Not Verified" });
  //           }
  //         } else {
  //           resolve({ result: false, message: "Login Error" });
  //         }
  //       })
  //       .catch(err => {
  //         resolve({
  //           result: false,
  //           message:
  //             "The password is invalid or the user does not have a password."
  //         });
  //       });
  //   });
  // }

  isEmailVerified() {
    return this.user.emailVerified;
  }

  getUser() {
    return this.auth.user;
  }
}
