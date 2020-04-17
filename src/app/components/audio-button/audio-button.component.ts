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

  public audioFinished = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    console.log(this.audio);

    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer == null) {
      return;
    }

    audioPlayer.addEventListener('ended', () => {
      this.audioFinished = true;
      console.log(this.audioFinished);
    });
  }

  public getSrcUrl(): string {
    if (this.audio == null) {
      return '';
    }
    const audioId = this.audio.audio_id.replace('a', 'A').replace('_', '.').replace('_', '.');
    return `assets/audio/${audioId}.mp3`;
  }

  public onClickAudioPlayer(audioPlayer: HTMLAudioElement): void {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    // Todo remove line below.
    // Add check for availableAudio & chats for complete component. Or else display nothing at location.
    this.audioCompleted.emit(this.audio);
  }

  public onClickFinishAudio(): void {
    this.audioCompleted.emit(this.audio);
  }

}
