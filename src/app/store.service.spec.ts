import { TestBed } from '@angular/core/testing';
import {TwitchStoreService} from './twitch/twitch-store/twitch-store.service';


describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitchStoreService = TestBed.get(TwitchStoreService);
    expect(service).toBeTruthy();
  });
});
