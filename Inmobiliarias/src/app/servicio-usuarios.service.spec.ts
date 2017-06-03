import { TestBed, inject } from '@angular/core/testing';

import { ServicioUsuariosService } from './servicio-usuarios.service';

describe('ServicioUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioUsuariosService]
    });
  });

  it('should ...', inject([ServicioUsuariosService], (service: ServicioUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
