import { TestBed } from '@angular/core/testing';

import { MetricsHttpService } from './metrics-http.service';

describe('MetricsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetricsHttpService = TestBed.get(MetricsHttpService);
    expect(service).toBeTruthy();
  });
});
