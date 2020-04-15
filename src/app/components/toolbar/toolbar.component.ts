import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public potionCount = 100;

  constructor() { }

  ngOnInit(): void {
    let decreasePotion = true;
    const changeFactor = 1;

    const source = interval(1);
    const subscribe = source.subscribe(val => {
      let newPotionValue = this.potionCount;

      if (this.potionCount >= 100 || this.potionCount <= 0) {
        decreasePotion = !decreasePotion;
      }

      if (decreasePotion) {
        newPotionValue = newPotionValue - changeFactor;
      } else {
        newPotionValue = newPotionValue + changeFactor;
      }

      if (newPotionValue > 100 || newPotionValue < 0) {
        return;
      }
      this.potionCount = newPotionValue;
    });
  }

  public getPotionWidth(): string {
    return `${this.potionCount}%`;
  }

}
