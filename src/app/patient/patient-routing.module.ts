import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CaptureimageComponent } from "./captureimage/captureimage.component";
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { PatientComponent } from "./patient/patient.component";

const routes: Routes = [
  {
    path: "",
    component: PatientComponent,

    children: [
      { path: "qrcode", component: QrcodeComponent },
      { path: "capture", component: CaptureimageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
