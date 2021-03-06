import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinoSetupComponent } from './arduino-setup.component';

describe('ArduinoSetupComponent', () => {
  let component: ArduinoSetupComponent;
  let fixture: ComponentFixture<ArduinoSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArduinoSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinoSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
