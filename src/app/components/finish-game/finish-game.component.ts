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

  constructor(
    private stageService: StageService
  ) { }

  ngOnInit(): void {
  }

  public onClickRestartGame(): void {
    this.stageService.resetGame();
  }

}
