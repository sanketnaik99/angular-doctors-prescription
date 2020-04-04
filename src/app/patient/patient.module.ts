import { NgModule, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CaptureimageComponent } from "./captureimage/captureimage.component";
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { QRCodeModule } from "angularx-qrcode";
import { PatientRoutingModule } from "./patient-routing.module";
import { PatientComponent } from "./patient/patient.component";
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';

@NgModule({
  declarations: [CaptureimageComponent, QrcodeComponent, PatientComponent, PatientdashboardComponent],
  imports: [CommonModule, PatientRoutingModule, QRCodeModule]
})
export class PatientModule {}
