import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.css"]
})
export class QrcodeComponent implements OnInit, AfterViewInit {
  patient_uid = "";

  constructor() {
    this.patient_uid = "WDRf74S2GVMdzPedLxgm97VIrZx1";
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    setTimeout(function() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem);
    }, 0);
  }
}
