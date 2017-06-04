import { TestBed, inject } from '@angular/core/testing';

import { ServicioLocalesService } from './servicio-locales.service';

describe('ServicioLocalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioLocalesService]
    });
  });

  it('should ...', inject([ServicioLocalesService], (service: ServicioLocalesService) => {
    expect(service).toBeTruthy();
  }));
});
