import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-button',
  templateUrl: './audio-button.component.html',
  styleUrls: ['./audio-button.component.scss']
})
export class AudioButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public onClickAudioPlayer(audioPlayer: HTMLAudioElement): void {
    audioPlayer.play();
    console.log(audioPlayer.constructor.name);
  }
}
