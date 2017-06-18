import { Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import {GoogleMapComponent, MapsManager} from "google-maps-ng2";

@Component({
  selector: 'app-mapa-producto',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  //templateUrl: './mapa-producto.component.html'
  template:`
    <div class="container">
      <h1>Angular 2 + Google Maps Places Autocomplete</h1>
      <div class="form-group">
        <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl" name="direccion" [(ngModel)]="direccion" id="direccion">
      </div>
      <sebm-google-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <sebm-google-map-marker [latitude]="latitude" [longitude]="longitude"></sebm-google-map-marker>
      </sebm-google-map>
    </div>
  `
})

export class MapaProductoComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public direccion;

  @ViewChild("search")
  //public searchElementRef: ElementRef;
  public searchElementRef;

  @ViewChild('directionsMap') directionsMap:GoogleMapComponent;

  public origin = <Coordinates>{
    longitude: Number(localStorage.getItem("Lng")),
    latitude: Number(localStorage.getItem("Lat"))
  };

  public destination = <Coordinates>{
    longitude: Number(localStorage.getItem("Lng")),
    latitude: Number(localStorage.getItem("Lat"))
  };


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone/*,
    private mapsManager:MapsManager*/
  ) {
    this.direccion = localStorage.getItem("Direccion");


  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
        
      
    this.latitude = Number(localStorage.getItem("Lat"));
    this.longitude = Number(localStorage.getItem("Lng"));
console.log(this.latitude);
console.log(this.longitude);
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude);
          console.log(this.longitude);          
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
console.log(this.longitude);  
        this.zoom = 12;
      });
    }
  }

/*
  //segunda forma, solo necesito mostrar el destino.
  ngOnInit(){
    this.directionsMap
        .getMap()
        .then(map=>{
            let markers = [this.origin, this.destination];
            this.mapsManager
                .calculateMapBounds(markers)
                .then((bounds) => {
                  bounds && this.directionsMap.fitBounds(bounds);
                });
        });
  }*/

}
