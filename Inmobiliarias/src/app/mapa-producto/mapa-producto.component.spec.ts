import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaProductoComponent } from './mapa-producto.component';

describe('MapaProductoComponent', () => {
  let component: MapaProductoComponent;
  let fixture: ComponentFixture<MapaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
