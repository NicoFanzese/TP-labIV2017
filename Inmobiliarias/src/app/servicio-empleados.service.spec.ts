import { TestBed, inject } from '@angular/core/testing';

import { ServicioEmpleadosService } from './servicio-empleados.service';

describe('ServicioEmpleadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioEmpleadosService]
    });
  });

  it('should ...', inject([ServicioEmpleadosService], (service: ServicioEmpleadosService) => {
    expect(service).toBeTruthy();
  }));
});
