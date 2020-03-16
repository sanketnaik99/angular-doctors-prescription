import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { RegistrationpageComponent } from "./auth/registrationpage/registrationpage.component";
import { CaptureimageComponent } from "./patient/captureimage/captureimage.component";
import { QrcodeComponent } from "./patient/qrcode/qrcode.component";
import { DoctorscanningComponent } from "./doctor/doctorscanning/doctorscanning.component";
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
    path: "captureimage",
    component: CaptureimageComponent
  },
  {
    path: "qrcode",
    component: QrcodeComponent
  },
  {
    path: "doctorscanning",
    component: DoctorscanningComponent
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
