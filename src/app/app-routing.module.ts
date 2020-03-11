import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegistrationpageComponent } from "./registrationpage/registrationpage.component";
import { CaptureimageComponent } from "./captureimage/captureimage.component";
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
