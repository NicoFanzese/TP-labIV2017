import { TestBed, inject } from '@angular/core/testing';

import { ServicioOfertasService } from './servicio-ofertas.service';

describe('ServicioOfertasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioOfertasService]
    });
  });

  it('should ...', inject([ServicioOfertasService], (service: ServicioOfertasService) => {
    expect(service).toBeTruthy();
  }));
});
