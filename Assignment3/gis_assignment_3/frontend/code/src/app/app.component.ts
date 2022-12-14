import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // There are two options to add markers to our map component
  // option 1: get the component and call add marker method directly
  @ViewChild(MapComponent) map!: MapComponent;

  // option 2: use @Input() in the child component
  amenities: { name: string; latitude: number; longitude: number }[] = [];


  /*
   * Services or other dependencies are often imported via dependency injection.
   * See https://angular.io/guide/dependency-injection for more details.
   */
  constructor(private dataservice: DataService) {}

  /**
   * @param $event add marker on the map at the specified latitude and longitude
   */
  onAddMarker($event: { latitude: number; longitude: number }) {
    this.map.addMarker($event.latitude, $event.longitude);
  }

  /*
   * Retrieve pubs from backend and override the member variable.
   */
  onPubsAdded() {
    this.dataservice.getPubs().subscribe((pubs) => {
      this.amenities = pubs;
    });
  }

  onGetAmenityAdded(amenity: string) {
    // send to the backend 
    this.dataservice.getAmenity(amenity).subscribe((amenity) => {
      console.log("INSIDE APP COMPONENT", amenity)
      this.amenities = amenity
    })

    
  }
}
