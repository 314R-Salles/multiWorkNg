import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandcampComponent } from './bandcamp.component';

describe('BandcampComponent', () => {
  let component: BandcampComponent;
  let fixture: ComponentFixture<BandcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
