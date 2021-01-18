import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArduinoInteractComponent } from './arduino-interact.component';

describe('ArduinoInteractComponent', () => {
  let component: ArduinoInteractComponent;
  let fixture: ComponentFixture<ArduinoInteractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArduinoInteractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinoInteractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
