import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegistrationpageComponent } from "./registrationpage/registrationpage.component";
import { CaptureimageComponent } from "./captureimage/captureimage.component";
import { QrcodeComponent } from "./qrcode/qrcode.component";
import { DoctorscanningComponent } from "./doctorscanning/doctorscanning.component";
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
    loadChildren: "./admin/admin.module#AdminModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
