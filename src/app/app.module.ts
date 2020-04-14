import { AuthEffects } from "./store/effects/auth.effects";
import { authReducer, auth_reducer } from "./store/reducers/auth.reducer";
import { environment } from "./../environments/environment.prod";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//Angular Fire Imports
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";

import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { RegistrationpageComponent } from "./auth/registrationpage/registrationpage.component";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { StoreModule } from "@ngrx/store";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { EffectsModule } from "@ngrx/effects";

import { ReactiveFormsModule } from "@angular/forms";
import { DoctorserviceService } from "./doctor/doctorservice.service";

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegistrationpageComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,

    AngularFirestoreModule,
    ReactiveFormsModule,

    StoreModule.forRoot({
      auth: auth_reducer
    }),
    AngularFireStorageModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireStorageModule
  ],
  providers: [DoctorserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
