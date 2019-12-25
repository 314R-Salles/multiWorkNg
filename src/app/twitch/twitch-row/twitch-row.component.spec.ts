import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchRowComponent } from './twitch-row.component';

describe('TwitchRowComponent', () => {
  let component: TwitchRowComponent;
  let fixture: ComponentFixture<TwitchRowComponent>;

  beforeEach(async(() => {
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
