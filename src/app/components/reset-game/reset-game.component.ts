import { Component, OnInit, Input } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-reset-game',
  templateUrl: './reset-game.component.html',
  styleUrls: ['./reset-game.component.scss']
})
export class ResetGameComponent implements OnInit {

  @Input() choice: number;

  private chooseableCharacter = [
    { id: 0, characterName: 'Epeo' },
    { id: 1, characterName: 'Johan' },
    { id: 2, characterName: 'Sisyphus' },
    { id: 3, characterName: 'Big Smile' }
  ];

  constructor(
    private stageService: StageService,
    private fireAnalytics: AngularFireAnalytics
  ) { }

  ngOnInit(): void {
  }


  public onClickResetGame(): void {
    const foundCharacter = this.chooseableCharacter.find(character => character.id === this.choice);
    if (foundCharacter == null) {
      this.fireAnalytics.logEvent('final_choice', { choosenCharacter: this.choice });
    } else {
      this.fireAnalytics.logEvent('final_choice', { choosenCharacter: foundCharacter.characterName });
    }
    this.stageService.resetGame();
  }
}
