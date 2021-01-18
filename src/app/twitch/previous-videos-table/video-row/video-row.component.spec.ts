import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoRowComponent } from './video-row.component';

describe('VideoRowComponent', () => {
  let component: VideoRowComponent;
  let fixture: ComponentFixture<VideoRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
