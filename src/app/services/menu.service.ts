import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public $menuChanged: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public openMenu(): void {
    console.log('menu opened');
    this.$menuChanged.next(true);
  }

  public closeMenu(): void {
    console.log('menu closed');
    this.$menuChanged.next(false);
  }

}
