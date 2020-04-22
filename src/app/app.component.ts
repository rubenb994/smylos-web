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

  public notSupportedWidth = 995;



  constructor(private stageService: StageService) {

    // Todo remove this line below (only for development)
    GameStateUtils.setLevel(0);
  }

  ngOnInit(): void {
    if (window.innerWidth < this.notSupportedWidth) {
      this.isMobile = true;
    }

    this.stagesLoading = true;
    this.stageService.setCurrentStage(GameStateUtils.getLevel());

    // Subscribe to the current stage and calculate toolbar values based on current stage.
    this.stageService.$currentStage.subscribe(result => {
      if (result == null) {
        return;
      }
      this.currentStage = result;
      this.stagesLoading = false;
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

  public onIntroductionFinish(): void {
    this.introductionFinished = true;
  }

  public onAlarmFinish(): void {
    this.alarmFinished = false;
  }
}
