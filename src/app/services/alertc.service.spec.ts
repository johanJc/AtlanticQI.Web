import { TestBed } from '@angular/core/testing';

import { AlertcService } from './alertc.service';

describe('AlertcService', () => {
  let service: AlertcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
