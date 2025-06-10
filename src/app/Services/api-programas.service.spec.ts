import { TestBed } from '@angular/core/testing';

import { ApiProgramasService } from './api-programas.service';

describe('ApiProgramasService', () => {
  let service: ApiProgramasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProgramasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
