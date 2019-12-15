import { TestBed } from '@angular/core/testing';

import { GuestEventsService } from './guest-events.service';

describe('GuestEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestEventsService = TestBed.get(GuestEventsService);
    expect(service).toBeTruthy();
  });
});
