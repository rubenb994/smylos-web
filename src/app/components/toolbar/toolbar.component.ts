import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Stage } from 'src/app/models/stage';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {


  @Input() currentStage: Stage;

  public potionCount = 100;

  public maxAmountChats = 0;
  public completedAmountChats = 0;

  public maxAmountAudios = 0;
  public completedAmountAudios = 0;

  constructor(
    private stageService: StageService,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
    this.stageService.$completedAudios.subscribe(results => {
      if (results == null || results.length < 0) {
        return;
      }
      this.completedAmountAudios = results.length;
    });

    this.stageService.$completedChats.subscribe(results => {
      if (results == null || results.length < 0) {
        return;
      }
      this.completedAmountChats = results.length;
    });

    this.stageService.$potionAmount.subscribe(result => {
      this.potionCount = result;
    });

    this.stageService.$potionAmount.subscribe(result => {
      if (result == null) {
        return;
      }
      this.potionCount = result;
    });


    // let decreasePotion = true;
    // const changeFactor = 1;

    // const source = interval(1);
    // const subscribe = source.subscribe(val => {
    //   let newPotionValue = this.potionCount;

    //   if (this.potionCount >= 100 || this.potionCount <= 0) {
    //     decreasePotion = !decreasePotion;
    //   }

    //   if (decreasePotion) {
    //     newPotionValue = newPotionValue - changeFactor;
    //   } else {
    //     newPotionValue = newPotionValue + changeFactor;
    //   }

    //   if (newPotionValue > 100 || newPotionValue < 0) {
    //     return;
    //   }
    //   this.potionCount = newPotionValue;
    // });
  }

  ngOnChanges(): void {
    const maxChatAudio = this.toolbarService.calculateMaxAmountChatsAndAudios(this.currentStage);
    if (maxChatAudio == null) {
      return;
    }
    this.maxAmountChats = maxChatAudio[0];
    this.maxAmountAudios = maxChatAudio[1];
  }

  public getPotionWidth(): string {
    return `${this.potionCount}%`;
  }

}
