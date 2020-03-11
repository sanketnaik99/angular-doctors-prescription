import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationpageComponent } from "./registrationpage.component";
import { from } from "rxjs";

describe("RegistrationpageComponent", () => {
  let component: RegistrationpageComponent;
  let fixture: ComponentFixture<RegistrationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationpageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
