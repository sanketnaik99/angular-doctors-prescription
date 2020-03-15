import { UserData } from "./../store/models/auth.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthResult } from "../services/auth.service";
import "firebase/firestore";
import { EmptyError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  userData: UserData;
  loggedInUser;
  isAdmin: boolean = true;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  logIn(email: string, password: string): Promise<AuthResult> {
    return new Promise(resolve => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
          if (res.user.uid != null) {
            this.loggedInUser = res.user;
            console.log(this.loggedInUser);
            this.getDbData(this.loggedInUser.uid)
              .then(data => {
                this.userData = data;
                this.isAdmin = true;
                resolve({
                  message: "Login Successful!",
                  result: true
                });
              })
              .catch(err => {
                resolve({
                  result: false,
                  message: err.reason
                });
              });
          } else {
            resolve({
              result: false,
              message: "Error Logging In."
            });
          }
        })
        .catch(err => {
          resolve({ result: false, message: err.message });
        });
    });
  }

  getDbData(uid: string): Promise<UserData> {
    return new Promise(async (resolve, reject) => {
      const data = this.afs
        .collection("Admins")
        .doc(`${uid}`)
        .get();
      data.subscribe(res => {
        console.log(res.exists);
        if (!res.exists) {
          reject({ reason: "User is not an Admin" });
        }
        const user = res.data;
        resolve({
          email: user["email"],
          username: user["username"],
          uid: user["uid"],
          userType: user["userType"],
          admin: user["admin"]
        });
      });
    });
  }
}
