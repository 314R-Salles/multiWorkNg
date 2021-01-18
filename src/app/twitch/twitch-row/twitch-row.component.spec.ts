import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TwitchRowComponent } from './twitch-row.component';

describe('TwitchRowComponent', () => {
  let component: TwitchRowComponent;
  let fixture: ComponentFixture<TwitchRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
