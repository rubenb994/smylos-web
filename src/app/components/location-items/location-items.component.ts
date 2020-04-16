import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { LOCATION_NAMES } from 'src/app/config/location-names';


@Component({
  selector: 'app-location-items',
  templateUrl: './location-items.component.html',
  styleUrls: ['./location-items.component.scss']
})
export class LocationItemsComponent implements OnInit, OnChanges, AfterViewInit {

  /**
   * Inputed selected location.
   */
  @Input() selectedLocation: number;


  /**
   * Default location names.
   */
  public locationNames = LOCATION_NAMES;


  /**
   * Selected location display name.
   */
  public selectedLocationDisplayName = 'Location';

  /**
   * Variables for chaning the location and menu.
   */
  public locationItem;
  public menuItem;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setLocationDisplayName();
  }

  /**
   * Method to set the right display name for a location.
   * Opens the menu when it changes.
   */
  private setLocationDisplayName(): void {
    if (this.selectedLocation == null) {
      return;
    }

    const locationName = this.locationNames.find(ln => ln.id === this.selectedLocation);
    if (locationName == null) {
      return;
    }

    this.selectedLocationDisplayName = locationName.displayName;
    // Open menu when location changes.
    this.onClickMenuOpen();
  }

  ngAfterViewInit(): void {
    this.locationItem = document.getElementById('chat');
    this.menuItem = document.getElementById('buttonMenu');
  }
  public onClickMenuOpen(): void {
    this.locationItem.style.left = '0px';
    this.menuItem.style.left = '-400px';
  }

  public onClickMenuClose(): void {
    this.locationItem.style.left = '-400px';
    this.menuItem.style.left = '25px';
  }

}
