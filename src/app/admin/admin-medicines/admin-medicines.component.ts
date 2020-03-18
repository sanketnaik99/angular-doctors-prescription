import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-medicines",
  templateUrl: "./admin-medicines.component.html",
  styleUrls: ["./admin-medicines.component.css"]
})
export class AdminMedicinesComponent implements OnInit {
  isLoading: boolean = true;
  medicines: any[];

  constructor(private adminService: AdminService) {}

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
}
