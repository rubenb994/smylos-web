import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Stage } from 'src/app/models/stage';
import { StageService } from 'src/app/services/stage.service';

/**
 * Component to display the toolbar including the chats, audios and potion amounts.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() currentStage: Stage;
  @Output() creditButtonClicked = new EventEmitter<boolean>();

  public potionCount = 0;

  public maxAmountChats = 0;
  public completedAmountChats = 0;

  public maxAmountAudios = 0;
  public completedAmountAudios = 0;
  public level = 0;

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

    this.stageService.$currentStage.subscribe(results => {
      if (results == null) {
        return;
      }
      this.currentStage = results;
      this.level = this.currentStage.level;
    });

    this.stageService.$completedChats.subscribe(results => {
      if (results == null || results.length < 0) {
        return;
      }
      this.completedAmountChats = results.length;
    });

    this.stageService.$potionAmount.subscribe(result => {
      if (result == null) {
        return;
      }
      this.potionCount = result;
    });
  }

  // open credits window
  public onClickCreditsOpen(): void {
    this.creditButtonClicked.emit(true);
  }


  ngOnChanges(): void {
    // Recalculate the amount of maxChats and audios.
    const maxChatAudio = this.toolbarService.calculateMaxAmountChatsAndAudios(this.currentStage);
    if (maxChatAudio == null) {
      return;
    }
    this.maxAmountChats = maxChatAudio[0];
    this.maxAmountAudios = maxChatAudio[1];

  }

  /**
   * Method to map the potion amount to a percentage.
   */
  public getPotionWidth(): string {
    return `${this.potionCount}%`;
  }

}
