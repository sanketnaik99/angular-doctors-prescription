import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { RegistrationpageComponent } from "./auth/registrationpage/registrationpage.component";

import { from } from "rxjs";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "registrationpage",
    component: RegistrationpageComponent
  },
  {
    path: "patient",
    loadChildren: "./patient/patient.module#PatientModule"
  },

  {
    path: "doctor",
    loadChildren: "./doctor/doctor.module#DoctorModule"
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
