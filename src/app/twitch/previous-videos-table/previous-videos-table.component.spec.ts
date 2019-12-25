import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousVideosTableComponent } from './previous-videos-table.component';

describe('PreviousVideosTableComponent', () => {
  let component: PreviousVideosTableComponent;
  let fixture: ComponentFixture<PreviousVideosTableComponent>;

  beforeEach(async(() => {
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
