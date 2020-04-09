import { UserData, UserCredentials } from "./../models/auth.model";
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
  providedIn: "root",
})
export class AuthService {
  user;
  userData;
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}

  register(credentials) {
    return this.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  signIn(userCredentials: UserCredentials): Promise<AuthResult> {
    return new Promise((resolve) => {
      //LOGIN
      console.log("AUTH SERVICE LOGIN");
      this.auth
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then(async (res) => {
          this.user = res.user;
          if (this.user.uid != null) {
            if (this.isEmailVerified()) {
              let userdata = await this.fetchDbData(
                this.user.uid,
                userCredentials.userType
              );
              if (userdata == null) {
                resolve({ result: false, message: "Login Error" });
              }
              this.userData = userdata;
              console.log("USER DATA", this.userData);
              resolve({
                result: true,
                message: "Logged in and Email Verified",
              });
            } else {
              resolve({ result: false, message: "Email Not Verified" });
            }
          } else {
            resolve({ result: false, message: "Login Error" });
          }
        })
        .catch((err) => {
          resolve({
            result: false,
            message:
              "The password is invalid or the user does not have a password.",
          });
        });
    });
  }

  async fetchDbData(uid: string, userType: string): Promise<any> {
    console.log(userType, uid);

    const docRef = this.afs.collection(userType).doc<UserData>(uid);
    let userSnapshot = await docRef.snapshotChanges();
    let user = userSnapshot.pipe(
      map((snap) => {
        if (snap.payload.exists) {
          const data = snap.payload.data();
          return { ...data };
        } else return null;
      })
    );
    if (user == null) {
      return null;
    } else {
      return new Promise((res) => {
        user.subscribe((data) => {
          res(data);
        });
      });
    }
  }

  isEmailVerified() {
    return this.user.emailVerified;
  }

  getUser() {
    return this.auth.user;
  }
}
