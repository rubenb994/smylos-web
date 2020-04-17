import { Component, OnInit } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';
import { GameStateUtils } from 'src/app/utils/game-state-util';

@Component({
  selector: 'app-finish-stage',
  templateUrl: './finish-stage.component.html',
  styleUrls: ['./finish-stage.component.scss']
})
export class FinishStageComponent implements OnInit {

  constructor(
    private stageService: StageService
  ) { }

  ngOnInit(): void {
  }

  public onClickFinishStage(): void {
    const nextLevel = GameStateUtils.getLevel() + 1;
    GameStateUtils.setLevel(nextLevel);

    this.stageService.setCurrentStage(nextLevel);
  }

}
