import { NgModule, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CaptureimageComponent } from "./captureimage/captureimage.component";
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { QRCodeModule } from "angularx-qrcode";
import { PatientRoutingModule } from "./patient-routing.module";
import { PatientComponent } from "./patient/patient.component";
import { PatientdashboardComponent } from "./patientdashboard/patientdashboard.component";
import { PatientserviceService } from "./patientservice.service";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [
    CaptureimageComponent,
    QrcodeComponent,
    PatientComponent,
    PatientdashboardComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    QRCodeModule,
    ImageCropperModule
  ],
  providers: []
})
export class PatientModule {}
