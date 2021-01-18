import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TwitchSectionComponent } from './twitch-section.component';

describe('TwitchSectionComponent', () => {
  let component: TwitchSectionComponent;
  let fixture: ComponentFixture<TwitchSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
