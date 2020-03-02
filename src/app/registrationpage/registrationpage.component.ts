import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrationpage',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationpageComponent implements OnInit {
  regitration_email="";
  registration_password="";
  username="";
  confirmpassword=""

  constructor() { }

  ngOnInit() {
  }

}
