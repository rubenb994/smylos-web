import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'smylos-web';
  public displayToolbar = true;
  public displayLogo = true;
  public displayLocationItem = true;

  ngOnInit(): void {

  }

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

