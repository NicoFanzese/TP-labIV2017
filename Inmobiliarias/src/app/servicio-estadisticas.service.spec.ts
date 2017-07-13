import { TestBed, inject } from '@angular/core/testing';

import { ServicioEstadisticasService } from './servicio-estadisticas.service';

describe('ServicioEstadisticasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioEstadisticasService]
    });
  });

  it('should ...', inject([ServicioEstadisticasService], (service: ServicioEstadisticasService) => {
    expect(service).toBeTruthy();
  }));
});
