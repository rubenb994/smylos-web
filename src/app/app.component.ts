import { Component, OnInit } from '@angular/core';
import { Stage } from './models/stage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameStateUtils } from './utils/game-state-util';


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


  /**
   * Variables for displaying the components.
   */
  public displayToolbar = true;
  public displayLogo = true;
  public displayLocationItem = true;

  constructor() {

  }

  ngOnInit(): void {

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
}
