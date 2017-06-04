import { TestBed, inject } from '@angular/core/testing';

import { ServicioProductosService } from './servicio-productos.service';

describe('ServicioProductosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioProductosService]
    });
  });

  it('should ...', inject([ServicioProductosService], (service: ServicioProductosService) => {
    expect(service).toBeTruthy();
  }));
});
