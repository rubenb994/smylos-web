import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Audio } from 'src/app/models/audio';
import { AudioService } from 'src/app/services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-button',
  templateUrl: './audio-button.component.html',
  styleUrls: ['./audio-button.component.scss']
})
export class AudioButtonComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() audio: Audio;
  @Input() autoPlay = false;
  @Input() disableButton = false;
  @Output() audioCompleted = new EventEmitter<Audio>(null);

  public audioPlayerSrc: string;
  public audioPlayerId: string;

  public paused = true;

  public audioPlayerDisabledClass = '';


  private audioServiceSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private audioService: AudioService) { }

  ngOnInit(): void {
    this.audioServiceSubscription = this.audioService.$toggleAudio.subscribe(audioId => {
      if (this.audio == null || audioId == null) {
        return;
      }
      const audioPlayer = document.getElementById(`${this.audio.audio_id}-audio-player`) as HTMLAudioElement;
      if (audioPlayer == null || this.audio.audio_id !== audioId) {
        return;
      }


      if (audioPlayer.paused) {
        // Todo remove line below.
        // this.audioCompleted.emit(this.audio);
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });
  }

  ngOnChanges(): void {
    if (this.audio == null) {
      return;
    }

    this.audioPlayerSrc = this.getSrcUrl();
    this.audioPlayerId = this.audio.audio_id;

    this.setDisabledClass();
  }

  ngAfterViewInit(): void {
    const audioPlayer = document.getElementById(`${this.audio.audio_id}-audio-player`) as HTMLAudioElement;
    if (audioPlayer == null) {
      return;
    }
    if (this.autoPlay && audioPlayer.paused) {
      audioPlayer.play();
      // Todo remove line below.
      // this.audioCompleted.emit(this.audio);
      // Detect changes so that the audio button displays the right icon.
      this.changeDetectorRef.detectChanges();
    }

    // Event listener to check when the audio player has finished.
    audioPlayer.addEventListener('ended', () => {
      this.audioCompleted.emit(this.audio);
    });
  }

  ngOnDestroy(): void {
    this.audioServiceSubscription.unsubscribe();
  }

  /**
   * Method to play and pause the audio player.
   * @param audioPlayer the audio player.
   */
  public onClickAudioPlayer(audioPlayer: HTMLAudioElement): void {
    if (this.disableButton) {
      return;
    }

    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    // Todo remove line below.
    // this.audioCompleted.emit(this.audio);
  }

  public checkIfAudioPlayerIsPaused(audioPlayer: HTMLAudioElement): boolean {
    if (audioPlayer == null) {
      return false;
    }
    return audioPlayer.paused;
  }

  /**
   * Method which triggers when the finish audio button is pressed.
   * Calls the output event.
   */
  public onClickFinishAudio(): void {
    this.audioCompleted.emit(this.audio);
  }

  private setDisabledClass(): void {
    if (this.disableButton) {
      this.audioPlayerDisabledClass = 'disabled-audio';
    } else {
      this.audioPlayerDisabledClass = '';
    }
  }

  /**
   * Method to fetch the src url of a audio file.
   */
  private getSrcUrl(): string {
    if (this.audio == null) {
      return '';
    }
    // Thanks to Andre his weird json this was nessecary since the internal id's use underscores and a lowercase letter.
    // While the audio files are using dots and a capital letter.
    const audioId = this.audio.audio_id.replace('a', 'A').replace('_', '.').replace('_', '.');
    return `assets/audio/${audioId}.mp3`;
  }
}
