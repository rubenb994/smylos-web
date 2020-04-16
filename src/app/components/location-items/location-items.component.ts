import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { LOCATION_NAMES } from 'src/app/config/location-names';
import { StageService } from 'src/app/services/stage.service';
import { GameStateUtils } from 'src/app/utils/game-state-util';
import { NFC } from 'src/app/models/nfc';


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


  public locationNFC: NFC = null;

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
  public locationItem: HTMLElement;
  public menuItem: HTMLButtonElement;

  constructor(
    private stageService: StageService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.selectedLocation == null) {
      return;
    }
    this.setLocationDisplayName();
    this.fetchCurrentLocationNFC();
  }

  ngAfterViewInit(): void {
    this.locationItem = document.getElementById('chat');
    this.menuItem = document.getElementById('buttonMenu') as HTMLButtonElement;
  }

  public onClickMenuOpen(): void {
    this.locationItem.style.left = '0px';
    this.menuItem.style.left = '-400px';
  }

  public onClickMenuClose(): void {
    this.locationItem.style.left = '-400px';
    this.menuItem.style.left = '25px';
  }

  private fetchCurrentLocationNFC(): void {
    this.locationNFC = this.stageService.getNFCForLocation(this.selectedLocation);
    console.log(this.locationNFC);
  }

  /**
   * Method to set the right display name for a location.
   * Opens the menu when it changes.
   */
  private setLocationDisplayName(): void {
    const locationName = this.locationNames.find(ln => ln.id === this.selectedLocation);
    if (locationName == null) {
      return;
    }

    this.selectedLocationDisplayName = locationName.displayName;
    // Open menu when location changes.
    this.onClickMenuOpen();
  }

}
