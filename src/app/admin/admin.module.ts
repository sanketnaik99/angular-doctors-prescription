import { AdminComponent } from "./admin/admin.component";
import { AdminService } from "./admin.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminAuthGuard } from "./admin.guard";
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { AdminAddMedicineComponent } from "./admin-add-medicine/admin-add-medicine.component";
import { AdminMedicinesComponent } from "./admin-medicines/admin-medicines.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: AdminLoginComponent
      },
      {
        path: "dashboard",
        component: AdminDashboardComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "add-medicine",
        component: AdminAddMedicineComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "medicines",
        component: AdminMedicinesComponent,
        canActivate: [AdminAuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminAddMedicineComponent,
    AdminMedicinesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdminAuthGuard]
})
export class AdminModule {}
