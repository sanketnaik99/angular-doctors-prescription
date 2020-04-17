import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "firebase/firestore";
import { Observable } from "rxjs";
import { UserData } from "../models/auth.model";

@Injectable({
  providedIn: "root"
})
export class PatientserviceService {
  userData;
  patientsdata: Observable<UserData>;
  patientdocument: AngularFirestoreDocument<UserData>;
  constructor(public afs: AngularFirestore) {}
  getpatientdata(item) {
    this.patientdocument = this.afs.doc(`Patient/${item}`);
    this.patientsdata = this.patientdocument.valueChanges();
    return this.patientsdata;
  }
}
