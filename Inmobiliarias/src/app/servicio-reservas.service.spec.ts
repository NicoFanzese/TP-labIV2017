import { TestBed, inject } from '@angular/core/testing';

import { ServicioReservasService } from './servicio-reservas.service';

describe('ServicioReservasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioReservasService]
    });
  });

  it('should ...', inject([ServicioReservasService], (service: ServicioReservasService) => {
    expect(service).toBeTruthy();
  }));
});
