import { Component, OnInit } from '@angular/core';
import { Stage } from './models/stage';
import { GameStateUtils } from './utils/game-state-util';
import { StageService } from './services/stage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Finished items per stage.
   */
  public finishedItems: string[];

  /**
   * Currently selected location.
   */
  public selectedLocation: number;
  public currentStage: Stage;

  /**
   * Variables for displaying the components.
   */
  public isMobile = false;
  public stagesLoading = true;
  public introductionFinished = false;
  public alarmFinished = false;
  public gameFinished = false;

  public notSupportedWidth = 995;

  public blurClass = '';

  constructor(private stageService: StageService) {
    // Todo remove this line below (only for development)
    // GameStateUtils.setLevel(4);
    // GameStateUtils.setIntroductionCleared(true);
  }

  ngOnInit(): void {
    // Toggle isMobile property based on window and notsupported width.
    if (window.innerWidth < this.notSupportedWidth) {
      this.isMobile = true;
    }

    // Set the currentStage & introductionFinished properties and apply based on introductionFinished.
    this.stageService.setCurrentStage(GameStateUtils.getLevel());
    this.introductionFinished = GameStateUtils.getIntroductionCleared();
    this.applyBlurClass();

    this.stagesLoading = true;

    // Subscribe to the current stage and calculate toolbar values based on current stage.
    this.stageService.$currentStage.subscribe(result => {
      if (result == null) {
        return;
      }
      this.currentStage = result;
      this.stagesLoading = false;
    });

    // Subscribe to stage finished property to display and hide the finish-game component.
    this.stageService.$gameFinished.subscribe(result => {
      if (result == null) {
        return;
      }
      console.log(result);
      this.gameFinished = result;
      this.applyBlurClass();
    });

    this.stageService.$potionAmount.subscribe(result => {
      if (result === 0) {
        this.alarmFinished = true;
      }
    });
  }

  /**
   * Method which triggers when a new location is selected by the map component.
   * Sets the selectedLocation for the locationItems component.
   * @param newLocation the new locaton.
   */
  public onNewLocationSelected(newLocation: number): void {
    if (newLocation == null) {
      return;
    }
    this.selectedLocation = newLocation;
  }

  /**
   * Methods for displaying the right components.
   */
  public onWindowResize(): void {
    this.evaluateMobileErrorDisplay();
  }

  /**
   * Method to evaluate if the mobile error should be displayed.
   */
  public evaluateMobileErrorDisplay(): void {
    if (window.innerWidth < this.notSupportedWidth) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  /**
   * Method which triggers when the introduction finishes.
   * @param introductionFinished the value which indicates if the stage is finsihed.
   */
  public onIntroductionFinish(introductionFinished: boolean): void {
    GameStateUtils.setIntroductionCleared(introductionFinished);
    this.introductionFinished = introductionFinished;
    this.applyBlurClass();
  }

  /**
   * Method which triggers when the potion alarm outputs.
   */
  public onAlarmFinish(): void {
    this.alarmFinished = false;
  }

  /**
   * Method to set the blurClass property based on the introductionFinished property or the game finished property.
   * If the game is finished or the introduction is not cleared the blur class will be applied.
   */
  private applyBlurClass(): void {
    console.log(this.introductionFinished, this.gameFinished);
    if (this.introductionFinished && !this.gameFinished) {
      this.blurClass = '';
    } else {
      this.blurClass = 'blur';
    }
  }

}
