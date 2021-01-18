import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreviousVideosTableComponent } from './previous-videos-table.component';

describe('PreviousVideosTableComponent', () => {
  let component: PreviousVideosTableComponent;
  let fixture: ComponentFixture<PreviousVideosTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousVideosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousVideosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
