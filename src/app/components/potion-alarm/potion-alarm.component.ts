import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';
import { GameStateUtils } from 'src/app/utils/game-state-util';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-potion-alarm',
  templateUrl: './potion-alarm.component.html',
  styleUrls: ['./potion-alarm.component.scss']
})
export class PotionAlarmComponent implements OnInit, OnChanges {

  @Input() currentStageLevel: number;

  @Output() alarmFinish = new EventEmitter();

  public displayAlternativePotionAlarm = false;

  constructor(
    private stageService: StageService,
    private fireAnalytics: AngularFireAnalytics) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.currentStageLevel == null) {
      return;
    }

    if (this.currentStageLevel === 0) {
      this.displayAlternativePotionAlarm = true;
    } else {
      this.displayAlternativePotionAlarm = false;
    }
  }

  public onClickFinishStage(): void {
    this.fireAnalytics.logEvent('stage_cleared', { level: GameStateUtils.getLevel() });

    const nextLevel = GameStateUtils.getLevel() + 1;
    GameStateUtils.setLevel(nextLevel);

    this.stageService.setCurrentStage(nextLevel);
    this.alarmFinish.emit();
  }

}
