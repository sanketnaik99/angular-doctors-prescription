import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DoctorscanningComponent } from "./doctorscanning/doctorscanning.component";
import { QRCodeModule } from "angularx-qrcode";

const routes: Routes = [
  {
    path: "",
    component: DoctorscanningComponent,
    children: [
      {
        path: "scan",
        component: DoctorscanningComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}
