import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinoInteractComponent } from './arduino-interact.component';

describe('ArduinoInteractComponent', () => {
  let component: ArduinoInteractComponent;
  let fixture: ComponentFixture<ArduinoInteractComponent>;

  beforeEach(async(() => {
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
