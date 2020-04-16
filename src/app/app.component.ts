import { Component, OnInit } from '@angular/core';
import { Stage } from './models/stage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameStateUtils } from './utils/game-state-util';
import { StageService } from './services/stage.service';
import { finalize, first } from 'rxjs/operators';
import { NFC } from './models/nfc';


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

  public stagesLoading = true;

  constructor(private stageService: StageService) {

  }

  ngOnInit(): void {
    this.stagesLoading = true;

    this.stageService.getStages()
      .pipe(
        first(results => results != null),
        finalize(() =>
          this.stagesLoading = false
        )
      )
      .subscribe(results => {
        this.stageService.stages = results;
        this.stageService.setCurrentStage(GameStateUtils.getLevel());
      });

    this.stageService.getCurrentStage().subscribe(result => {
      this.currentStage = result;
      this.calculateToolbarValues();
    });
  }

  public onNewLocationSelected(newLocation: number): void {
    if (newLocation == null || newLocation === this.selectedLocation) {
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

  public evaluateToolbarDisplay(): void {
    if (window.innerWidth < 600) {
      this.displayToolbar = false;
    } else {
      this.displayToolbar = true;
    }
  }

  public evaluateLogoDisplay(): void {
    if (window.innerWidth < 400) {
      this.displayLogo = false;
    } else {
      this.displayLogo = true;
    }
  }

  public evaluateLocationItemDisplay(): void {
    if (window.innerWidth < 800) {
      this.displayLocationItem = false;
    } else {
      this.displayLocationItem = true;
    }
  }

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
