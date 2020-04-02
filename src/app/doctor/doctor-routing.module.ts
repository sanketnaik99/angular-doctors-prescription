import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DoctorscanningComponent } from "./doctorscanning/doctorscanning.component";
import { DoctorDashboardComponent } from "./doctor-dashboard/doctor-dashboard.component";
import { QRCodeModule } from "angularx-qrcode";
import { DoctorComponent } from "./doctor/doctor.component";

const routes: Routes = [
  {
    path: "",
    component: DoctorComponent,
    children: [
      {
        path: "scan",
        component: DoctorscanningComponent
      },
      {
        path: "dashboard",
        component: DoctorDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}
