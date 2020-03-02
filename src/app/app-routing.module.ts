import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component'



const routes: Routes = [
  {
    path:'',
    component:LoginPageComponent
  },
  {
    path:'registrationpage',
    component:RegistrationpageComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
