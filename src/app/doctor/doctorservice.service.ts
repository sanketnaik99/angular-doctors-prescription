import { UserData } from "./../models/auth.model";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "firebase/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DoctorserviceService {
  userData;
  patientcollection: AngularFirestoreCollection<UserData>;
  patientdocument: AngularFirestoreDocument<UserData>;
  patients: Observable<UserData[]>;
  patientsdata: Observable<UserData>;

  constructor(public afs: AngularFirestore) {}

  getdata() {
    console.log(this.userData);
    this.patientcollection = this.afs
      .collection<UserData>("Doctor")
      .doc(this.userData.uid)
      .collection<UserData>("Patients");
    this.patients = this.patientcollection.valueChanges();
    return this.patients;
  }

  getpatientdata(item) {
    this.patientdocument = this.afs.doc(`Patient/${item}`);
    this.patientsdata = this.patientdocument.valueChanges();
    return this.patientsdata;
  }

  additem(item: UserData) {
    this.patientcollection = this.afs
      .collection<UserData>("Doctor")
      .doc(this.userData.uid)
      .collection<UserData>("Patients");
    this.patientcollection.add(item);
  }
}
