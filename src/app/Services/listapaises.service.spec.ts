import { TestBed } from '@angular/core/testing';

import { ListapaisesService } from './listapaises.service';

describe('ListapaisesService', () => {
  let service: ListapaisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListapaisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
