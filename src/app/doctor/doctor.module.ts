import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorscanningComponent } from "./doctorscanning/doctorscanning.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { QRCodeModule } from "angularx-qrcode";

import { DoctorRoutingModule } from "./doctor-routing.module";
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

@NgModule({
  declarations: [DoctorscanningComponent, DoctorComponent, DoctorDashboardComponent],
  imports: [CommonModule, DoctorRoutingModule, ZXingScannerModule, QRCodeModule]
})
export class DoctorModule {}
