import { TestBed, inject } from '@angular/core/testing';

import { TwitchHttpService } from './twitch-http-service';

describe('TwitchHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitchHttpService]
    });
  });

  it('should be created', inject([TwitchHttpService], (service: TwitchHttpService) => {
    expect(service).toBeTruthy();
  }));
});
