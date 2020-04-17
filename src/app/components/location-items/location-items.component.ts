import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { LOCATION_NAMES } from 'src/app/config/location-names';
import { StageService } from 'src/app/services/stage.service';
import { NFC } from 'src/app/models/nfc';
import { Audio } from 'src/app/models/audio';


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
  public displayChat = false;
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

  /**
   * Available Chats.
   */
  public availableChats: string[];
  public availableAudios: string[];

  constructor(
    private stageService: StageService
  ) { }

  ngOnInit(): void {
    this.stageService.$availableChats.subscribe(results => {
      this.availableChats = results;
    });

    this.stageService.$availableAudios.subscribe(results => {
      this.availableAudios = results;
    });
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
    this.menuItem = document.getElementById('button-menu') as HTMLButtonElement;
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

  public chatAvailable(): boolean {
    if (this.availableChats == null || this.availableChats.length < 0) {
      return false;
    }
    return this.availableChats.find(availableChat => availableChat === this.locationNFC.chat.chat_id) != null;
  }

  public audioAvailable(audio: Audio): boolean {
    if (this.availableAudios == null || this.availableAudios.length < 0) {
      return false;
    }
    return this.availableAudios.find(availableAudio => availableAudio === audio.audio_id) != null;
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
  public onClickOpenAudio(audio: Audio): void {
    this.displayAudio = true;
    this.selectedAudio = audio;
  }

  public onChatCompleted(): void {
    this.displayChat = false;
    this.stageService.removeAvailableChats(this.locationNFC.chat.chat_id);
    console.log('chat completed');
  }

  public onAudioCompleted(audio: Audio): void {
    this.displayAudio = false;
    this.stageService.removeAvailableAudios(audio.audio_id);
    console.log('audio completed');
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
