import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Audio } from '../models/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public $toggleAudio: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  public toggleAudio(audio: Audio) {
    if (audio == null) {
      return;
    }
    this.$toggleAudio.next(audio.audio_id);
  }
}
