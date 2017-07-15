import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public latMap;
  public lngMap;
  public zoom;
  constructor() { 
    this.latMap= -34.7562049;
    this.lngMap = -58.20878540000001;   
    this.zoom  = 12;
  }

  ngOnInit() {
  }

}
