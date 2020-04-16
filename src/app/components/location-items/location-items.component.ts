import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { LOCATION_NAMES } from 'src/app/config/location-names';
import { StageService } from 'src/app/services/stage.service';
import { GameStateUtils } from 'src/app/utils/game-state-util';
import { NFC } from 'src/app/models/nfc';
import { Audio } from 'src/app/models/audio';
import { Chat } from 'src/app/models/chat';


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
   * Variables for displaying audio and chat components.
   */
  public displayChat = true;
  public displayAudio = false;

  /**
   * Variables for holding the selected chat and selected audio.
   */
  public selectedAudio: Audio;

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

  /**
   * Method which triggers when the menu gets opened.
   * Opens the menu.
   */
  public onClickMenuOpen(): void {
    this.locationItem.style.left = '0px';
    this.menuItem.style.left = '-400px';
  }

  /**
   * Method which triggers when the menu gets closed.
   * Closes the menu.
   */
  public onClickMenuClose(): void {
    this.locationItem.style.left = '-400px';
    this.menuItem.style.left = '25px';
  }

  /**
   * Method which triggers when the open chat button gets clicked.
   */
  public onClickOpenChat(): void {
    this.displayChat = true;
  }

  /**
   * Method which triggers when the open audio button gets clicked.
   * @param clickedAudio the clicked audio entry.
   */
  public onClickOpenAudio(clickedAudio: Audio): void {

  }

  /**
   * Method to fetch the nfc for the selected location.
   */
  private fetchCurrentLocationNFC(): void {
    this.locationNFC = this.stageService.getNFCForLocation(this.selectedLocation);
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
