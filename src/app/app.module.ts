import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    
    RegistrationpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
   
   
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
