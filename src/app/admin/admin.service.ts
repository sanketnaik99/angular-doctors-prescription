import { UserData } from "./../store/models/auth.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthResult } from "../services/auth.service";
import "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  userData: UserData;
  loggedInUser;
  isAdmin: boolean;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  logIn(email: string, password: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (res.user.uid != null) {
            this.loggedInUser = res.user;
            console.log(this.loggedInUser);
            this.getUserData(this.loggedInUser.uid)
              .then((data) => {
                this.userData = data;
                this.isAdmin = true;
                resolve({
                  message: "Login Successful!",
                  result: true,
                });
              })
              .catch((err) => {
                resolve({
                  result: false,
                  message: err.reason,
                });
              });
          } else {
            resolve({
              result: false,
              message: "Error Logging In.",
            });
          }
        })
        .catch((err) => {
          resolve({ result: false, message: err.message });
        });
    });
  }

  getUserData(uid: string): Promise<UserData> {
    return new Promise(async (resolve, reject) => {
      const data = this.afs.collection("Admins").doc(`${uid}`).get();
      data.subscribe((res) => {
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
          admin: user["admin"],
        });
      });
    });
  }

  getDoctorData(): Promise<any[]> {
    return new Promise((resolve) => {
      this.afs
        .collection("Doctor")
        .valueChanges()
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  getPatientData(): Promise<any[]> {
    return new Promise((resolve) => {
      this.afs
        .collection("Patient")
        .valueChanges()
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  getMedicineData(): Promise<any[]> {
    return new Promise((resolve) => {
      this.afs
        .collection("Medicines")
        .valueChanges()
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  makeAdmin(user: UserData): Promise<any> {
    return new Promise((resolve) => {
      this.afs
        .collection("Admins")
        .doc(`${user.uid}`)
        .get()
        .subscribe((data) => {
          if (data.exists) {
            resolve({ result: false, message: "User is already an Admin" });
          } else {
            this.afs
              .collection("Admins")
              .doc(user.uid)
              .set({ ...user, isAdmin: true })
              .then((res) => {
                resolve({
                  result: true,
                  message: `${user.username} is now an Admin.`,
                });
              })
              .catch((err) => {
                resolve({ result: false, messge: "Error in Processing!" });
              });
          }
        });
    });
  }
}
