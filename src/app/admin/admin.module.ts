import { AdminService } from "./admin.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CanActivate } from "@angular/router";
import { AdminAuthGuard } from "./admin.guard";
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login"
  },
  {
    path: "login",
    component: AdminLoginComponent
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent, AdminNavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdminAuthGuard]
})
export class AdminModule {}
