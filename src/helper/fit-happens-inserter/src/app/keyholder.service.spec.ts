import { TestBed } from '@angular/core/testing';

import { KeyholderService } from './keyholder.service';

describe('KeyholderService', () => {
  let service: KeyholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
