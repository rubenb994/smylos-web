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
    /**
     * Subscribe to the available chats and audios.
     */
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

  /**
   * Create links to html elements for controlling them.
   */
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

  /**
   * Method to check whether the selected location has available chats.
   */
  public chatAvailable(): boolean {
    if (this.availableChats == null || this.availableChats.length < 0) {
      return false;
    }
    return this.availableChats.find(availableChat => availableChat === this.locationNFC.chat.chat_id) != null;
  }

  /**
   * Method to check wheter a audio item is in the available audios list.
   * @param audio the audio to check.
   */
  public audioAvailable(audio: Audio): boolean {
    if (this.availableAudios == null || this.availableAudios.length < 0) {
      return false;
    }
    return this.availableAudios.find(availableAudio => availableAudio === audio.audio_id) != null;
  }

  /**
   * Method to check wheter any audio item of a location NFC is available.
   */
  public audiosAvailable(): boolean {
    const locationAudios = this.locationNFC.audios;
    if (this.availableAudios == null || this.availableAudios.length < 0) {
      return false;
    }

    for (let index = 0; index < locationAudios.length; index++) {
      const audio = locationAudios[index];

      const availableAudioMatch = this.availableAudios.find(availableAudio => availableAudio === audio.audio_id);
      if (availableAudioMatch == null) {
        locationAudios.splice(index, 1);
      }
    }
    return locationAudios.length > 0;
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

  /**
   * Method which triggers when the chat completed.
   * Removes the chat from the available chats.
   */
  public onChatCompleted(): void {
    this.displayChat = false;
    const stageFinished = this.stageService.removeAvailableChat(this.locationNFC.chat.chat_id);
    console.log('stage finsished', stageFinished);
    console.log('chat completed');
  }

  /**
   * Method which triggers when the audio completed.
   * Removes the audio from the available audios.
   * @param audio the completed audio.
   */
  public onAudioCompleted(audio: Audio): void {
    this.displayAudio = false;
    const stageFinished = this.stageService.removeAvailableAudio(audio.audio_id);
    console.log('stage finsished', stageFinished);
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
