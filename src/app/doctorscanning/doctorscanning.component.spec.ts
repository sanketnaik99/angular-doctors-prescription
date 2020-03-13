import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorscanningComponent } from './doctorscanning.component';

describe('DoctorscanningComponent', () => {
  let component: DoctorscanningComponent;
  let fixture: ComponentFixture<DoctorscanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorscanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorscanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
