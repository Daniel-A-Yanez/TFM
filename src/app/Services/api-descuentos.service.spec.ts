import { TestBed } from '@angular/core/testing';

import { ApiDescuentosService } from './api-descuentos.service';

describe('ApiDescuentosService', () => {
  let service: ApiDescuentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDescuentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
