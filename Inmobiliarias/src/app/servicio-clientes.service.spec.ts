import { TestBed, inject } from '@angular/core/testing';

import { ServicioClientesService } from './servicio-clientes.service';

describe('ServicioClientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioClientesService]
    });
  });

  it('should ...', inject([ServicioClientesService], (service: ServicioClientesService) => {
    expect(service).toBeTruthy();
  }));
});
