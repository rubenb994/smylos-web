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
   * Variables for displaying toolbar values.
   */
  public maxAmountChats = 0;
  public finishedAmountChats = 0;

  public maxAmountAudios = 0;
  public finishedAmountAudios = 0;

  /**
   * Variables for displaying the components.
   */
  public displayToolbar = true;
  public displayLogo = true;
  public displayLocationItem = true;
  public displayFinishStage = false;

  public stagesLoading = true;

  constructor(private stageService: StageService) {
    GameStateUtils.setLevel(1);
  }

  ngOnInit(): void {
    this.stagesLoading = true;
    this.stageService.setCurrentStage(GameStateUtils.getLevel());

    // Subscribe to the current stage and calculate toolbar values based on current stage.
    this.stageService.$currentStage.subscribe(result => {
      if (result == null) {
        return;
      }
      this.currentStage = result;
      this.stagesLoading = false;
      this.calculateToolbarValues();
    });

    this.stageService.$stageFinished.subscribe(result => {
      if (result == null) {
        return;
      }
      this.displayFinishStage = result;
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
    this.evaluateToolbarDisplay();
    this.evaluateLogoDisplay();
    this.evaluateLocationItemDisplay();
  }

  /**
   * Method to evaluate if the toolbar should be displayed.
   */
  public evaluateToolbarDisplay(): void {
    if (window.innerWidth < 600) {
      this.displayToolbar = false;
    } else {
      this.displayToolbar = true;
    }
  }

  /**
   * Method to evaluate if the logo should be displayed.
   */
  public evaluateLogoDisplay(): void {
    if (window.innerWidth < 400) {
      this.displayLogo = false;
    } else {
      this.displayLogo = true;
    }
  }

  /**
   * Method to evaluate if the locationItem should be displayed.
   */
  public evaluateLocationItemDisplay(): void {
    if (window.innerWidth < 800) {
      this.displayLocationItem = false;
    } else {
      this.displayLocationItem = true;
    }
  }

  /**
   * Method to calculate the values for the toolbar.
   * Stores these values in the maxAmountAudios & maxAmountChats variables.
   */
  private calculateToolbarValues(): void {
    if (this.currentStage == null) {
      return;
    }

    let maxAmountAudios = 0;
    let maxAmountChats = 0;

    this.currentStage.nfc.forEach(nfcItem => {

      if (nfcItem.chat != null) {
        maxAmountChats++;
      }

      if (nfcItem.audios != null && nfcItem.audios.length > 0) {
        maxAmountAudios = maxAmountAudios + nfcItem.audios.length;
      }
    });
    this.maxAmountAudios = maxAmountAudios;
    this.maxAmountChats = maxAmountChats;
  }

}
