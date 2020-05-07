import { Component, OnInit } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';

/**
 * Component which appears when the game is finished.
 */
@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {

  public choiceMade = false;
  public choiceNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

  public onChoiceMade(choice: number) {
    this.choiceNumber = choice;
    this.choiceMade = true;
  }



}
