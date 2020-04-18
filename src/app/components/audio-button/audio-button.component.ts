import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Audio } from 'src/app/models/audio';

@Component({
  selector: 'app-audio-button',
  templateUrl: './audio-button.component.html',
  styleUrls: ['./audio-button.component.scss']
})
export class AudioButtonComponent implements OnInit, OnChanges {

  @Input() audio: Audio;
  @Output() audioCompleted = new EventEmitter<Audio>(null);

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer == null) {
      return;
    }
    // Event listener to check when the audio player has finished.
    audioPlayer.addEventListener('ended', () => {
      this.audioCompleted.emit(this.audio);
    });
  }

  /**
   * Method to fetch the src url of a audio file.
   */
  public getSrcUrl(): string {
    if (this.audio == null) {
      return '';
    }
    // Thanks to Andre his weird json this was nessecary since the internal id's use underscores and a lowercase letter.
    // While the audio files are using dots and a capital letter.
    const audioId = this.audio.audio_id.replace('a', 'A').replace('_', '.').replace('_', '.');
    return `assets/audio/${audioId}.mp3`;
  }

  /**
   * Method to play and pause the audio player.
   * @param audioPlayer the audio player.
   */
  public onClickAudioPlayer(audioPlayer: HTMLAudioElement): void {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    // Todo remove line below.
    this.audioCompleted.emit(this.audio);
  }

  /**
   * Method which triggers when the finish audio button is pressed.
   * Calls the output event.
   */
  public onClickFinishAudio(): void {
    this.audioCompleted.emit(this.audio);
  }

}
