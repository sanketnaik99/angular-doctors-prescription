import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureimageComponent } from './captureimage.component';

describe('CaptureimageComponent', () => {
  let component: CaptureimageComponent;
  let fixture: ComponentFixture<CaptureimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
