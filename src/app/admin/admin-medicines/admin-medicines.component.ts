import { finalize } from "rxjs/operators";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const BASE_URL = "https://handwriting-recognition-api.herokuapp.com/api/v1";

@Component({
  selector: "app-admin-medicines",
  templateUrl: "./admin-medicines.component.html",
  styleUrls: ["./admin-medicines.component.css"]
})
export class AdminMedicinesComponent implements OnInit {
  isLoading: boolean = true;
  medicines: any[];
  image = File;
  task: AngularFireUploadTask;
  URL: Observable<string>;
  downloadURL: string;
  result: string = "";
  predictionSuccess: string = "";

  constructor(
    private adminService: AdminService,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.adminService
      .getMedicineData()
      .then(res => {
        this.medicines = res;
        this.isLoading = false;
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  addImage(files) {
    this.image = files[0];
  }

  uploadImage() {
    const timestamp = Date.now();

    const path = `captures/test`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.image);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("FINALIZED");

          this.URL = ref.getDownloadURL();
          this.URL.subscribe(res => {
            this.downloadURL = res;
            console.log(this.downloadURL);
            const params = new HttpParams({
              fromObject: {
                imageURL: this.downloadURL
              }
            });

            const config = {
              headers: new HttpHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
              })
            };
            this.http
              .post(`${BASE_URL}/predict-medicine`, params, config)
              .subscribe(res => {
                this.result = res["prediction"];
                this.predictionSuccess = res["result"];
                console.log(res);
              });
          });
        })
      )
      .subscribe();
  }
}
