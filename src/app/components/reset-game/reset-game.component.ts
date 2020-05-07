import { Component, OnInit, Input } from '@angular/core';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-reset-game',
  templateUrl: './reset-game.component.html',
  styleUrls: ['./reset-game.component.scss']
})
export class ResetGameComponent implements OnInit {

  @Input() choice: number;

  constructor(
    private stageService: StageService
  ) { }

  ngOnInit(): void {
  }


  public onClickResetGame(): void {
    this.stageService.resetGame();
  }
}
