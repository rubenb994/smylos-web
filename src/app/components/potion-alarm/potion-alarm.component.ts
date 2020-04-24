import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';
import { GameStateUtils } from 'src/app/utils/game-state-util';

@Component({
  selector: 'app-potion-alarm',
  templateUrl: './potion-alarm.component.html',
  styleUrls: ['./potion-alarm.component.scss']
})
export class PotionAlarmComponent implements OnInit {

  @Output() alarmFinish = new EventEmitter();

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
  }

  public onClickFinishStage(): void {
    const nextLevel = GameStateUtils.getLevel() + 1;
    GameStateUtils.setLevel(nextLevel);

    this.stageService.setCurrentStage(nextLevel);
    this.alarmFinish.emit();
  }

}
